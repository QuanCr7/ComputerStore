package com.example.website.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name="categories")
public class CategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private int categoryId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String image;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<ProductEntity> products;
}