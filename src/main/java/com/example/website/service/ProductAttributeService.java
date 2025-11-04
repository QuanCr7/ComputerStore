package com.example.website.service;

import com.example.website.request.ProductAttributeRequest;
import com.example.website.response.ProductAttributeResponse;

import java.util.List;

public interface ProductAttributeService {
    List<ProductAttributeResponse> add(ProductAttributeRequest request);
    List<ProductAttributeResponse> getByProductId(int id);
}
