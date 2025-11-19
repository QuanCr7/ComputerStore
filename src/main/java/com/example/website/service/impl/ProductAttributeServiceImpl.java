package com.example.website.service.impl;

import com.example.website.entity.ProductAttributeEntity;
import com.example.website.entity.ProductEntity;
import com.example.website.repository.ProductAttributeRepository;
import com.example.website.repository.ProductRepository;
import com.example.website.request.ProductAttributeRequest;
import com.example.website.response.ProductAttributeResponse;
import com.example.website.service.ProductAttributeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class ProductAttributeServiceImpl implements ProductAttributeService {
    private final ProductAttributeRepository productAttributeRepository;
    private final ProductRepository productRepository;

    // khong con can thiet
    @Override
    public List<ProductAttributeResponse> add(ProductAttributeRequest request) {
        ProductEntity product = productRepository.findById(request.getProductId()).orElseThrow(() -> new RuntimeException("Product not found with ID: " + request.getProductId()));

        ProductAttributeEntity productAttribute = ProductAttributeEntity.builder()
                .product(product)
                .key(request.getKey())
                .value(request.getValue())
                .build();

        productAttributeRepository.save(productAttribute);
        return getByProductId(request.getProductId());
    }

    @Override
    public List<ProductAttributeResponse> getByProductId(int id) {
        return responses(productAttributeRepository.findByProductProductId(id));
    }

    public ProductAttributeResponse response(ProductAttributeEntity response){
        return  ProductAttributeResponse.builder()
                .attributeId(response.getAttributeId())
                .key(response.getKey())
                .value(response.getValue())
                .build();
    }

    public List<ProductAttributeResponse> responses(List<ProductAttributeEntity> productAttributes) {
        return productAttributes.stream()
                .map(this::response) // Sử dụng phương thức response hiện có cho từng ProductAttribute
                .toList();
    }
}
