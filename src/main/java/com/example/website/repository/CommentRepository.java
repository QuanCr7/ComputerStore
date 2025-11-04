package com.example.website.repository;

import com.example.website.entity.CommentEntity;
import com.example.website.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Integer> {
    Page<CommentEntity> findAllByProduct(ProductEntity product, Pageable pageable);
    Optional<CommentEntity> findById(int id);
}
