package com.example.website.repository;

import com.example.website.entity.OrderDetailEntity;
import com.example.website.utils.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetailEntity, Integer> {
    List<OrderDetailEntity> findByDetailId(int orderId);

    @Query("SELECT od FROM OrderDetailEntity od WHERE od.order.orderDate BETWEEN :startDate AND :endDate AND od.order.status = :status")
    List<OrderDetailEntity> findByOrderOrderDateBetweenAndOrderStatus(
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("status") OrderStatus status
    );
}
