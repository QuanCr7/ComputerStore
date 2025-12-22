package com.example.website.service;

import com.example.website.request.OrderDetailRequest;
import com.example.website.request.OrderRequest;
import com.example.website.response.OrderResponse;
import com.example.website.response.PageOrderResponse;

import java.util.List;

public interface OrderService {
    PageOrderResponse findAll(Integer page);

    OrderResponse getById(int id);
    PageOrderResponse getByUserId(Integer page);

    OrderResponse create(OrderRequest request, List<OrderDetailRequest> orderDetailRequests);
    OrderResponse updateStatus(int orderId, String newStatus);
    OrderResponse cancelOrder(int orderId);

    PageOrderResponse getByCondition(Integer page, String keyword, String status);
}
