package com.example.website.service.impl;

import com.example.website.configuration.CustomUserDetails;
import com.example.website.entity.CommentEntity;
import com.example.website.entity.ProductEntity;
import com.example.website.entity.UserEntity;
import com.example.website.repository.CommentRepository;
import com.example.website.repository.ProductRepository;
import com.example.website.repository.UserRepository;
import com.example.website.request.CommentRequest;
import com.example.website.response.CommentResponse;
import com.example.website.response.PageCommentResponse;
import com.example.website.service.CommentService;
import com.example.website.utils.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private static final int size = 15;

    @Override
    public PageCommentResponse findAll(Integer page) {
        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size);

        Page<CommentEntity> entityPage = commentRepository.findAll(pageable);
        Page<CommentResponse> responsePage = entityPage.map(this::response);

        return PageCommentResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(responsePage.getSize())
                .totalPages(responsePage.getTotalPages())
                .totalElements(responsePage.getTotalElements())
                .comments(responsePage.getContent())
                .build();
    }

    @Override
    public PageCommentResponse findAllByProductId(Integer page,int id) {
        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size, Sort.by("createAt").descending());

        Page<CommentEntity> entityPage = commentRepository.findAllByProduct(product, pageable);
        Page<CommentResponse> responsePage = entityPage.map(this::response);

        return PageCommentResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(responsePage.getSize())
                .totalPages(responsePage.getTotalPages())
                .totalElements(responsePage.getTotalElements())
                .comments(responsePage.getContent())
                .build();
    }

    @Override
    public CommentEntity get(int id) {
        return commentRepository.findById(id).orElseThrow(()-> new RuntimeException("Comment Not Found"));
    }

    @Override
    public CommentResponse add(CommentRequest commentRequest) {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new org.springframework.security.authentication.AuthenticationCredentialsNotFoundException(
                    "Vui lòng đăng nhập để bình luận!"
            );
        }

        Integer userId = userDetails.getId();
        if (userId == null) {
            throw new RuntimeException("Không thể lấy ID người dùng");
        }

        ProductEntity product = productRepository.findById(commentRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + commentRequest.getProductId()));
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        CommentEntity comment = CommentEntity.builder()
                .comment(commentRequest.getComment())
                .createAt(LocalDateTime.now())
                .product(product)
                .user(user)
                .build();

        return response(commentRepository.save(comment));
    }

    @Override
    public void delete(int id) {
        var auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !(auth.getPrincipal() instanceof CustomUserDetails userDetails)) {
            throw new org.springframework.security.authentication.AuthenticationCredentialsNotFoundException(
                    "Vui lòng đăng nhập để xóa bình luận!"
            );
        }

        Integer currentUserId = userDetails.getId();
        Role currentUserRole = userDetails.getUserEntity().getRole();

        CommentEntity comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));

        // chỉ cho phép xoá nếu là chính chủ hoặc ADMIN
        if (!currentUserId.equals(comment.getUser().getUserId())
                && currentUserRole != Role.ADMIN) {
            throw new AccessDeniedException("Bạn không có quyền xoá bình luận này");
        }

        commentRepository.deleteById(id);
    }

    public CommentResponse response(CommentEntity response) {
        return CommentResponse.builder()
                .commentId(response.getCommentId())
                .comment(response.getComment())
                .productId(response.getProduct().getProductId())
                .userId(response.getUser().getUserId())
                .username(response.getUser().getUsername())
                .createdAt(response.getCreateAt())
                .build();
    }

    private static String getString(String name) {
        return name.replace("-", " ");
    }
}
