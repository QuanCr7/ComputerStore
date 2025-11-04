package com.example.website.repository;

import com.example.website.entity.OrderEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    Optional<OrderEntity> findByOrderId(int id);

    @Query("SELECT o FROM OrderEntity o WHERE o.user.userId = :userId")
    Page<OrderEntity> findByUserId(Integer userId, Pageable pageable);
}
