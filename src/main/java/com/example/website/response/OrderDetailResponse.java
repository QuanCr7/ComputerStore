package com.example.website.response;

import lombok.*;

import java.math.BigDecimal;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {
    private int id;
    private String product;
    private BigDecimal price;
    private int quantity;
    private String brand;
    private String category;
    private String image;
}
