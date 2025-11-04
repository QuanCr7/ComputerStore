package com.example.website.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {
    private String name;
    private BigDecimal price;
    private String description;
    private int stockQuantity;
    private int warranty;
    private int discount;
    private int brandId;
    private int categoryId;
    private MultipartFile[] images;
    private List<ProductAttributeRequest> attributes;
}
