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
@Table(name="brands")
public class BrandEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private int brandId;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String image;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    private List<ProductEntity> products;
}
