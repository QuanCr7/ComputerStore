package com.example.website.service;

import com.example.website.entity.CommentEntity;
import com.example.website.request.CommentRequest;
import com.example.website.response.CommentResponse;
import com.example.website.response.PageCommentResponse;

public interface CommentService {
    PageCommentResponse findAll(Integer page);
    PageCommentResponse findAllByProductId(Integer page,int id);

    CommentEntity get(int id);
    CommentResponse add(CommentRequest commentRequest);
    void delete(int id);
}
