package com.example.website.service.impl;

import com.example.website.entity.CategoryEntity;
import com.example.website.repository.CategoryRepository;
import com.example.website.request.CategoryRequest;
import com.example.website.response.CategoryResponse;
import com.example.website.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    private final Path rootLocation = Paths.get("src/main/resources/static/images/category");

    @Override
    public List<CategoryResponse> findAll() {
        return responses(categoryRepository.findAll());
    }

//    @Override
//    public List<CategoryEntity> getByBook(int bookId) {
//        return categoryRepository.findAllByBookId(bookId);
//    }

    @Override
    public CategoryResponse get(int id) {
        return response(categoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Category Not Found")));
    }

    @Override
    public CategoryEntity getById(int id) {
        return categoryRepository.findById(id).orElseThrow(()-> new RuntimeException("Category Not Found"));
    }

    @Override
    public CategoryResponse add(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new RuntimeException("Category Name Already Exists");
        }

        String image = saveImage(request.getImage());

        CategoryEntity category = CategoryEntity.builder()
                .name(request.getName())
                .image(image)
                .build();
        return response(categoryRepository.save(category));
    }

    @Override
    public CategoryResponse update(int id, CategoryRequest request) {
        CategoryEntity category = getById(id);
        category.setName(request.getName());
        String image = saveImage(request.getImage());
        if (image!=null && !image.isEmpty()) {
            category.setImage(image);
        } else {
            category.setImage(category.getImage());
        }
        return response(categoryRepository.save(category));
    }

    @Override
    public void delete(int id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public List<CategoryResponse> getByUsername(String name) {
        return responses(categoryRepository.searchByNameLike(name));
    }

    public String saveImage(MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = imageFile.getOriginalFilename();
                Path filePath = rootLocation.resolve(fileName);

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, imageFile.getBytes());

                return fileName;
            } catch (IOException e) {
//                e.printStackTrace();
//                throw new RuntimeException("Failed to save image file: " + e.getMessage(), e);
                log.error("Failed to save image file: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to save image file", e);
            }
        }
        return null;
    }

    public CategoryResponse response(CategoryEntity response){
        return CategoryResponse.builder()
                .categoryId(response.getCategoryId())
                .name(response.getName())
                .build();
    }

    public List<CategoryResponse> responses(List<CategoryEntity> responses) {
        return responses.stream()
                .map(this::response) // Sử dụng phương thức response hiện có cho từng CategoryEntity
                .toList();
    }
}
