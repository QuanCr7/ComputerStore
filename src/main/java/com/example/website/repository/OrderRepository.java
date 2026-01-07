package com.example.website.repository;

import com.example.website.entity.OrderEntity;
import com.example.website.utils.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findAll();
    Optional<OrderEntity> findByOrderId(int id);

    @Query("SELECT o FROM OrderEntity o WHERE o.user.userId = :userId")
    Page<OrderEntity> findByUserId(Integer userId, Pageable pageable);

    @Query("SELECT o FROM OrderEntity o WHERE o.user.userId = :userId AND o.orderDate BETWEEN :startDate AND :endDate")
    List<OrderEntity> findByUserIdAndOrderDateBetween(
            @Param("userId") Integer userId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate
    );

    @Query("""
    SELECT o FROM OrderEntity o
    WHERE
        (:keyword IS NULL OR
            CAST(o.orderId AS string) LIKE %:keyword% OR
            o.phone LIKE %:keyword% OR
            o.user.username LIKE %:keyword%)
    AND
        (:status IS NULL OR o.status = :status)
    ORDER BY o.orderDate DESC
    """)
    Page<OrderEntity> searchOrders(
            @Param("keyword") String keyword,
            @Param("status") OrderStatus status,
            Pageable pageable
    );

}
