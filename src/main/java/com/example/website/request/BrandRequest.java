package com.example.website.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BrandRequest {
    private String name;
    private MultipartFile image;
}
