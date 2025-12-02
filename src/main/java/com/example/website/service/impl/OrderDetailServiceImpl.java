package com.example.website.service.impl;

import com.example.website.entity.OrderEntity;
import com.example.website.entity.ProductEntity;
import com.example.website.repository.OrderRepository;
import com.example.website.repository.ProductRepository;
import com.example.website.request.OrderDetailRequest;
import com.example.website.entity.OrderDetailEntity;
import com.example.website.repository.OrderDetailRepository;
import com.example.website.response.OrderDetailResponse;
import com.example.website.service.OrderDetailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class OrderDetailServiceImpl implements OrderDetailService {
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    // khng con dung
    @Override
    public List<OrderDetailResponse> add(OrderDetailRequest orderDetailRequest) {
        OrderEntity order = orderRepository.findById(orderDetailRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderDetailRequest.getOrderId()));

        ProductEntity product = productRepository.findById(orderDetailRequest.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + orderDetailRequest.getProductId()));

        OrderDetailEntity orderDetail = OrderDetailEntity.builder()
                .order(order)
                .product(product)
                .priceAtPurchase(product.getPrice())
                .quantity(orderDetailRequest.getQuantity())
                .build();
        orderDetailRepository.save(orderDetail);
        return getOrderDetailByOrderId(orderDetailRequest.getOrderId());
    }

    @Override
    public List<OrderDetailResponse> getOrderDetailByOrderId(int orderId) {
        return responses(orderDetailRepository.findByDetailId(orderId));
    }

    public OrderDetailResponse response(OrderDetailEntity response) {
        return OrderDetailResponse.builder()
                .id(response.getOrder().getOrderId())
                .price(response.getPriceAtPurchase())
                .quantity(response.getQuantity())
                .product(response.getProduct().getName())
                .brand(response.getProduct().getBrand().getName())
                .category(response.getProduct().getCategory().getName())
                .image(response.getProduct().getImages().getFirst())
                .build();
    }

    public List<OrderDetailResponse> responses(List<OrderDetailEntity> orderDetails) {
        return orderDetails.stream()
                .map(this::response) // Sử dụng phương thức response hiện có cho từng UserEntity
                .toList();
    }
}
