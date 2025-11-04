package com.example.website.response;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandResponse {
    private int brandId;
    private String name;
    private String image;
}
