package com.example.website.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductAttributeResponse {
    private int attributeId;
    private String key;
    private String value;
}
