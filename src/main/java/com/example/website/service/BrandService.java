package com.example.website.service;

import com.example.website.entity.BrandEntity;
import com.example.website.request.BrandRequest;
import com.example.website.response.BrandResponse;

import java.util.List;

public interface BrandService {
    List<BrandResponse> findAll();

    BrandResponse get(int id);
    BrandEntity getById(int id);

    BrandResponse add(BrandRequest request);
    BrandResponse update(int id,BrandRequest request);
    void delete(int id);
}
