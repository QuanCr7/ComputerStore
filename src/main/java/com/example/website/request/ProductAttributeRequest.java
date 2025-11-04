package com.example.website.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeRequest {
    private int productId;
    private String key;
    private String value;
}
