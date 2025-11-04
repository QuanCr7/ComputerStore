package com.example.website.service;

import com.example.website.entity.UserEntity;
import com.example.website.request.UserRegisterRequest;
import com.example.website.response.PageUserResponse;
import com.example.website.response.UserResponse;

public interface UserService {
    PageUserResponse findAll(Integer page);

    UserResponse getByUsername(String username);
    UserResponse getCurrentUser();
    UserResponse get(int id);
    UserEntity getByid(int id);

    PageUserResponse getByCondition(Integer page,String name,String email,Integer id,String phone);

    UserResponse update(int id,UserRegisterRequest request);
    void delete(int id);

//    List<String> saveImages(MultipartFile[] imageFiles);
//    String saveImage(MultipartFile imageFile);
}
