package com.example.website.repository;

import com.example.website.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, Integer> {
    boolean existsByName(String name);
    Optional<ProductEntity> findByName(String name);

    @Query("SELECT p FROM ProductEntity p " +
            "LEFT JOIN p.brand b " +
            "LEFT JOIN p.category c " +
            "WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))) " +
            "AND (:brand IS NULL OR LOWER(b.name) LIKE LOWER(CONCAT('%', :brand, '%'))) " +
            "AND (:category IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :category, '%')))")
    Page<ProductEntity> searchByCondition(Pageable pageable,
                                        @Param("name") String name,
                                        @Param("brand") String brand,
                                        @Param("category") String category);

    @Query("SELECT p FROM ProductEntity p " +
            "LEFT JOIN FETCH p.comments c " +
            "LEFT JOIN FETCH c.user " +
            "WHERE p.productId = :id")
    Optional<ProductEntity> findByIdWithComments(@Param("id") int id);
}
