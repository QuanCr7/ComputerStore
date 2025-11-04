package com.example.website.service;

import com.example.website.entity.ProductEntity;
import com.example.website.request.ProductAttributeRequest;
import com.example.website.request.ProductRequest;
import com.example.website.request.StockQuantityRequest;
import com.example.website.response.PageProductResponse;
import com.example.website.response.ProductResponse;

import java.util.List;

public interface ProductService {
    PageProductResponse index(Integer page);

    ProductEntity getById(int id);
    ProductResponse get(int id);
    ProductResponse add(ProductRequest request,List<ProductAttributeRequest> attributes);
    ProductResponse update(int id,ProductRequest request,List<ProductAttributeRequest> attributes);
    void delete(int id);

    ProductResponse updateStockQuantity(StockQuantityRequest request);

    PageProductResponse getByCondition(Integer page,String name,String brand,String category);
}
