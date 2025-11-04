package com.example.website.repository;

import com.example.website.entity.ProductAttributeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttributeEntity, Integer> {
    List<ProductAttributeEntity> findByProductProductId(int productId);
}
