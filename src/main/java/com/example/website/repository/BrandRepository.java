package com.example.website.repository;

import com.example.website.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity, Integer> {
    Boolean existsByName(String name);

    Optional<BrandEntity> findById(Integer id);
}
