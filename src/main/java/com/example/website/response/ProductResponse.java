package com.example.website.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private int productId;
    private String name;
    private BigDecimal price;
    private String description;
    private int stockQuantity;
    private int warranty;
    private int discount;
    private LocalDate createDate;
    private List<String> images;
    private String brand;
    private String category;
    private List<ProductAttributeResponse> attributes;
    private List<CommentResponse> comments;
}
