package com.example.website.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockQuantityRequest {
    private int stockQuantity;
}
