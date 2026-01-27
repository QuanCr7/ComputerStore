package com.example.website.service.impl;

import com.example.website.entity.BrandEntity;
import com.example.website.entity.CategoryEntity;
import com.example.website.entity.ProductAttributeEntity;
import com.example.website.entity.ProductEntity;
import com.example.website.repository.BrandRepository;
import com.example.website.repository.CategoryRepository;
import com.example.website.repository.ProductAttributeRepository;
import com.example.website.repository.ProductRepository;
import com.example.website.request.ProductAttributeRequest;
import com.example.website.request.ProductRequest;
import com.example.website.request.StockQuantityRequest;
import com.example.website.response.CommentResponse;
import com.example.website.response.PageProductResponse;
import com.example.website.response.ProductAttributeResponse;
import com.example.website.response.ProductResponse;
import com.example.website.service.ProductAttributeService;
import com.example.website.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductAttributeRepository productAttributeRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    private final Path rootLocation = Paths.get("src/main/resources/static/images/product");

    private static final int size = 10;

    @Override
    public PageProductResponse index(Integer page) {
        int pageNumber = (page == null) ? 0 : page - 1;
        Pageable pageable = PageRequest.of(pageNumber, size);

        Page<ProductEntity> entityPage = productRepository.findAll(pageable);
        Page<ProductResponse> responsePage = entityPage.map(this::responseList);

        return PageProductResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(entityPage.getSize())
                .totalPages(entityPage.getTotalPages())
                .totalElements(entityPage.getTotalElements())
                .products(responsePage.getContent())
                .build();
    }

    @Override
    public ProductEntity getById(int id) {
        return productRepository.findById(id).orElseThrow(()-> new RuntimeException("Product Not Found"));
    }

    @Override
    public ProductResponse get(int id) {
        ProductEntity product = productRepository.findByIdWithComments(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        return response(product);
    }

    @Override
    public ProductResponse add(ProductRequest request,List<ProductAttributeRequest> attributes) {
        if (productRepository.existsByName(request.getName())) {
            throw new RuntimeException("Product Already Exists");
        }

        BrandEntity brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Brand not found with ID: " + request.getBrandId()));

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found with ID: " + request.getCategoryId()));

        List<String> images = saveImages(request.getImages());

        ProductEntity product = ProductEntity.builder()
                .name(request.getName())
                .price(request.getPrice())
                .description(request.getDescription())
                .stockQuantity(request.getStockQuantity())
                .warranty(request.getWarranty())
                .discount(request.getDiscount())
                .createDate(LocalDate.now())
                .images(images)
                .brand(brand)
                .category(category)
                .build();
        productRepository.save(product);

        if (attributes != null && !attributes.isEmpty()) {
            List<ProductAttributeEntity> attributeEntities = new ArrayList<>();
            for (ProductAttributeRequest attrReq : attributes) {
                ProductAttributeEntity attr = ProductAttributeEntity.builder()
                        .product(product)
                        .key(attrReq.getKey())
                        .value(attrReq.getValue())
                        .build();
                productAttributeRepository.save(attr);
                attributeEntities.add(attr);
            }
            product.setAttributes(attributeEntities);
            productRepository.save(product);
        }

        return response(product);

//        // Thêm chi tiết product bằng cách sử dụng ProductAttributeService
//        List<ProductAttributeEntity> productAttributes = new ArrayList<>();
//        for (ProductAttributeRequest productAttributeRequest : attributes) {
//            ProductAttributeRequest attributeRequest = ProductAttributeRequest.builder()
//                    .productId(product.getProductId())
//                    .key(productAttributeRequest.getKey())
//                    .value(productAttributeRequest.getValue())
//                    .build();
//            // Gọi phương thức add từ ProductAttributeService
//            List<ProductAttributeResponse> attributeResponses = productAttributeService.add(attributeRequest);
//            ProductAttributeEntity attributeEntity = productAttributeRepository.findById(attributeResponses.getFirst().getAttributeId())
//                    .orElseThrow(() -> new RuntimeException("Failed to retrieve added product attribute"));
//
//            productAttributes.add(attributeEntity);
//        }
//
//        product.setAttributes(productAttributes);
//        productRepository.save(product);
//        return response(product);
    }

    @Override
    @Transactional
    public ProductResponse update(int id, ProductRequest request, List<ProductAttributeRequest> attributes) {

        ProductEntity product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        if (!product.getName().equals(request.getName())
                && productRepository.existsByName(request.getName())) {
            throw new RuntimeException("Tên sản phẩm đã tồn tại");
        }

        BrandEntity brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new IllegalArgumentException("Brand not found"));

        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        product.setName(request.getName());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setStockQuantity(request.getStockQuantity());
        product.setWarranty(request.getWarranty());
        product.setDiscount(request.getDiscount());
        product.setBrand(brand);
        product.setCategory(category);

        if (request.getImages() != null && request.getImages().length > 0) {
            List<String> newImages = saveImages(request.getImages());
            List<String> allImages = new ArrayList<>(product.getImages());
            allImages.addAll(newImages);
            product.setImages(allImages);
        }

        product.getAttributes().clear();

        if (attributes != null && !attributes.isEmpty()) {
            for (ProductAttributeRequest attrReq : attributes) {
                product.getAttributes().add(
                        ProductAttributeEntity.builder()
                                .product(product)
                                .key(attrReq.getKey())
                                .value(attrReq.getValue())
                                .build()
                );
            }
        }

        productRepository.save(product);

        return response(product);
    }


    @Override
    public void delete(int id) {
        productRepository.deleteById(id);
    }

    @Override
    public ProductResponse updateStockQuantity(StockQuantityRequest request) {
        return null;
    }

    @Override
    public PageProductResponse getByCondition(Integer page,String name,String brand,String category, String sort) {
        int pageNumber = (page == null) ? 0 : page - 1;

        Sort sortObj = Sort.unsorted();

        if ("price_asc".equals(sort)) {
            sortObj = Sort.by("price").ascending();
        } else if ("price_desc".equals(sort)) {
            sortObj = Sort.by("price").descending();
        }

        Pageable pageable = PageRequest.of(pageNumber, size, sortObj);

        Page<ProductEntity> entityPage = productRepository.searchByCondition(pageable,name, brand, category);
        Page<ProductResponse> responsePage = entityPage.map(this::response);

        return PageProductResponse.builder()
                .currentPage(pageNumber + 1)
                .pageSize(entityPage.getSize())
                .totalPages(entityPage.getTotalPages())
                .totalElements(entityPage.getTotalElements())
                .products(responsePage.getContent())
                .build();
    }

    public ProductResponse responseList(ProductEntity response){
        return ProductResponse.builder()
                .productId(response.getProductId())
                .name(response.getName())
                .price(response.getPrice())
                .discount(response.getDiscount())
                .stockQuantity(response.getStockQuantity())
                .warranty(response.getWarranty())
                .createDate(response.getCreateDate())
                .images(response.getImages())
                .brand(response.getBrand().getName())
                .category(response.getCategory().getName())
                .build();
    }

    public ProductResponse response(ProductEntity response) {
        List<CommentResponse> commentResponses = null;

        if (response.getComments() != null && !response.getComments().isEmpty()) {
            commentResponses = response.getComments().stream()
                    .map(commentEntity -> CommentResponse.builder()
                            .commentId(commentEntity.getCommentId())
                            .comment(commentEntity.getComment())
                            .productId(commentEntity.getProduct().getProductId())
                            .userId(commentEntity.getUser().getUserId())
                            .createdAt(commentEntity.getCreateAt())
                            .build())
                    .toList();
        }

        return ProductResponse.builder()
                .productId(response.getProductId())
                .name(response.getName())
                .price(response.getPrice())
                .description(response.getDescription())
                .stockQuantity(response.getStockQuantity())
                .warranty(response.getWarranty())
                .discount(response.getDiscount())
                .createDate(response.getCreateDate())
                .images(response.getImages())
                .brand(response.getBrand().getName())
                .category(response.getCategory().getName())
                .attributes(response.getAttributes() != null ?
                        response.getAttributes().stream()
                                .map(attr -> ProductAttributeResponse.builder()
                                        .attributeId(attr.getAttributeId())
                                        .key(attr.getKey())
                                        .value(attr.getValue())
                                        .build())
                                .toList()
                        : null)
                .comments(commentResponses)
                .build();
    }

    public List<String> saveImages(MultipartFile[] imageFiles) {
        List<String> imageNames = new ArrayList<>();
        for (MultipartFile imageFile : imageFiles) {
            String fileName = saveImage(imageFile);
            if (fileName != null) {
                imageNames.add(fileName);
            }
        }
        return imageNames;
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
                log.error("Failed to save image file: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to save image file", e);
            }
        }
        return null;
    }
}
