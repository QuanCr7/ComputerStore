package com.example.website.service;

import com.example.website.entity.CategoryEntity;
import com.example.website.request.CategoryRequest;
import com.example.website.response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> findAll();
//    List<CategoryResponse> getByBook(int bookId);

    CategoryResponse get(int id);
    CategoryEntity getById(int id);
    CategoryResponse add(CategoryRequest request);
    CategoryResponse update(int id,CategoryRequest request);
    void delete(int id);

    List<CategoryResponse> getByUsername(String name);

}
