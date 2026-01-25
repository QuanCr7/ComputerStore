package com.example.website.service.impl;

import com.example.website.configuration.CustomUserDetails;
import com.example.website.entity.OrderDetailEntity;
import com.example.website.entity.OrderEntity;
import com.example.website.entity.ProductEntity;
import com.example.website.entity.UserEntity;
import com.example.website.repository.OrderRepository;
import com.example.website.repository.ProductRepository;
import com.example.website.repository.UserRepository;
import com.example.website.request.OrderDetailRequest;
import com.example.website.request.OrderRequest;
import com.example.website.response.OrderDetailResponse;
import com.example.website.response.OrderResponse;
import com.example.website.response.PageOrderResponse;
import com.example.website.service.OrderService;
import com.example.website.utils.OrderStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    private static final int size = 10;

    @Override
    public PageOrderResponse findAll(Integer page) {
        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size);

        Page<OrderEntity> orderEntities = orderRepository.findAll(pageable);
        Page<OrderResponse> responsePage = orderEntities.map(this::response);

        return PageOrderResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(responsePage.getSize())
                .totalPages(responsePage.getTotalPages())
                .totalElements(responsePage.getTotalElements())
                .orders(responsePage.getContent())
                .build();
    }

    @Override
    public List<OrderResponse> findAllForStatistics() {
        return orderRepository.findAll()
                .stream()
                .map(this::response)
                .toList();
    }

    @Override
    public OrderResponse getById(int id) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Integer currentUserId = userDetails.getId();

        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

        UserEntity orderUser = order.getUser();
        boolean isOwner = orderUser.getUserId() == currentUserId;
        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_ADMIN"));

        if (!isOwner && !isAdmin) {
            throw new RuntimeException("Bạn không có quyền truy cập đơn hàng này");
        }

        return response(order);
    }

    @Override
    public PageOrderResponse getByUserId(Integer page) {
        // Lấy userId từ SecurityContext
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = userDetails.getId();
        if (userId == null) {
            throw new RuntimeException("User not authenticated");
        }

        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size);

        Page<OrderEntity> orderEntities = orderRepository.findByUserId(userId, pageable);
        Page<OrderResponse> responsePage = orderEntities.map(this::response);

        return PageOrderResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(responsePage.getSize())
                .totalPages(responsePage.getTotalPages())
                .totalElements(responsePage.getTotalElements())
                .orders(responsePage.getContent())
                .build();
    }

    @Override
    @Transactional
    public OrderResponse create(OrderRequest request, List<OrderDetailRequest> orderDetailRequests) {
        // Lấy userId từ SecurityContext
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Integer userId = userDetails.getId();
        if (userId == null) {
            log.error("User not authenticated");
            throw new RuntimeException("User not authenticated");
        }

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        OrderEntity order = OrderEntity.builder()
                .orderDate(LocalDateTime.now())
                .name(request.getName())
                .phone(request.getPhone())
                .totalAmount(request.getTotalAmount())
                .shippingAddress(request.getShippingAddress())
                .status(OrderStatus.PENDING)
                .user(user)
                .orderDetails(new ArrayList<>())
                .build();
        order = orderRepository.save(order);

        for (OrderDetailRequest detailReq : orderDetailRequests) {
            ProductEntity product = productRepository.findById(detailReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + detailReq.getProductId()));

            if (product.getStockQuantity() < detailReq.getQuantity()) {
                throw new RuntimeException(
                        "Sản phẩm " + product.getName() + " không đủ hàng"
                );
            }

            product.setStockQuantity(
                    product.getStockQuantity() - detailReq.getQuantity()
            );

            productRepository.save(product);

            OrderDetailEntity detail = OrderDetailEntity.builder()
                    .order(order)
                    .product(product)
                    .quantity(detailReq.getQuantity())
                    .priceAtPurchase(detailReq.getPrice() != null ? detailReq.getPrice() : product.getPrice())
                    .build();

            order.getOrderDetails().add(detail);
        }

        orderRepository.save(order);

        return response(order);
    }

    @Override
    public OrderResponse updateStatus(int orderId, String newStatus) {
        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));

        OrderStatus status = OrderStatus.valueOf(newStatus.toUpperCase());
        order.setStatus(status);

        return response(orderRepository.save(order));
    }

    @Override
    public OrderResponse cancelOrder(int orderId) {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        Integer currentUserId = userDetails.getId();

        OrderEntity order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Đơn hàng không tồn tại"));

        // Kiểm tra đơn hàng có thuộc về user đang đăng nhập không
        if (order.getUser().getUserId() != currentUserId) {
            throw new RuntimeException("Bạn không có quyền hủy đơn hàng này");
        }

        // Chỉ cho phép hủy khi đang ở trạng thái PENDING hoặc PROCESSING (tùy bạn điều chỉnh)
        if (order.getStatus() == OrderStatus.CANCELLED) {
            throw new RuntimeException("Đơn hàng đã được hủy trước đó");
        }
        if (order.getStatus() == OrderStatus.SHIPPING || order.getStatus() == OrderStatus.COMPLETED) {
            throw new RuntimeException("Không thể hủy đơn hàng đã giao hoặc đang giao");
        }

        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);

        return response(order);
    }

    @Override
    public PageOrderResponse getByCondition(Integer page, String keyword, String status) {
        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size);

        String searchKeyword = (keyword == null || keyword.trim().isEmpty())
                ? null
                : keyword.trim();

        OrderStatus orderStatus = null;
        if (status != null && !status.equalsIgnoreCase("ALL")) {
            try {
                orderStatus = OrderStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Trạng thái đơn hàng không hợp lệ");
            }
        }

        Page<OrderEntity> entityPage =
                orderRepository.searchOrders(searchKeyword, orderStatus, pageable);

        Page<OrderResponse> responsePage = entityPage.map(this::response);

        return PageOrderResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(responsePage.getSize())
                .totalPages(responsePage.getTotalPages())
                .totalElements(responsePage.getTotalElements())
                .orders(responsePage.getContent())
                .build();
    }

    public OrderResponse response(OrderEntity order) {
        List<OrderDetailResponse> detailResponses = order.getOrderDetails().stream()
                .map(detail -> OrderDetailResponse.builder()
                        .id(detail.getDetailId())
                        .product(detail.getProduct().getName())
                        .price(detail.getPriceAtPurchase())
                        .quantity(detail.getQuantity())
                        .brand(detail.getProduct().getBrand().getName())
                        .category(detail.getProduct().getCategory().getName())
                        .image(detail.getProduct().getImages().getFirst())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getOrderId())
                .shippingAddress(order.getShippingAddress())
                .orderDate(order.getOrderDate())
                .name(order.getName())
                .phone(order.getPhone())
                .status(order.getStatus().name())
                .totalAmount(order.getTotalAmount())
                .userId(order.getUser().getUserId())
                .orderDetails(detailResponses)
//                .orderDetails(orderDetailService.getOrderDetailByOrderId(order.getOrderId()))
                .build();
    }
}
