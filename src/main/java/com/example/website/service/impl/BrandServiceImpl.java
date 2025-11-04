package com.example.website.service.impl;

import com.example.website.entity.BrandEntity;
import com.example.website.repository.BrandRepository;
import com.example.website.request.BrandRequest;
import com.example.website.response.BrandResponse;
import com.example.website.service.BrandService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class BrandServiceImpl implements BrandService {
    private final BrandRepository brandRepository;

    private final Path rootLocation = Paths.get("src/main/resources/static/images/brand");

    @Override
    public List<BrandResponse> findAll() {
        return responses(brandRepository.findAll());
    }

    @Override
    public BrandResponse get(int id) {
        return response(brandRepository.findById(id).orElseThrow(()-> new RuntimeException("Brand Not Found")));
    }

    @Override
    public BrandEntity getById(int id) {
        return brandRepository.findById(id).orElseThrow(()-> new RuntimeException("Brand Not Found"));
    }

    @Override
    public BrandResponse add(BrandRequest request) {
        if (brandRepository.existsByName(request.getName())) {
            throw new RuntimeException("Brand Name Already Exists");
        }

        String image = saveImage(request.getImage());

        BrandEntity brand = BrandEntity.builder()
                .name(request.getName())
                .image(image)
                .build();
        return response(brandRepository.save(brand));
    }

    @Override
    public BrandResponse update(int id, BrandRequest request) {
        BrandEntity brand = getById(id);
        brand.setName(request.getName());
        String image = saveImage(request.getImage());
        if (image!=null && !image.isEmpty()) {
            brand.setImage(image);
        } else {
            brand.setImage(brand.getImage());
        }
        return response(brandRepository.save(brand));
    }

    @Override
    public void delete(int id) {
        brandRepository.deleteById(id);
    }

    public String saveImage(MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = imageFile.getOriginalFilename();
                Path filePath = rootLocation.resolve(fileName);

                // Kiểm tra và tạo thư mục nếu chưa tồn tại
                Files.createDirectories(filePath.getParent());
                Files.write(filePath, imageFile.getBytes());

                return fileName;
            } catch (IOException e) {
//                e.printStackTrace();
//                throw new RuntimeException("Failed to save image file: " + e.getMessage(), e);
                log.error("Failed to save image file: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to save image file", e);
            }
        }
        return null;
    }

    public BrandResponse response(BrandEntity response) {
        return BrandResponse.builder()
                .brandId(response.getBrandId())
                .name(response.getName())
                .image(response.getImage())
                .build();
    }

    public List<BrandResponse> responses(List<BrandEntity> responses) {
        return responses.stream()
                .map(this::response) // Sử dụng phương thức response hiện có cho từng BrandEntity
                .toList();
    }
}
