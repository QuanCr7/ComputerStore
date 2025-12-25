package com.example.website.controller.API;

import com.example.website.request.BrandRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.BrandResponse;
import com.example.website.service.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class BrandController extends BaseController {
    private final BrandService brandService;

    @Operation(
            summary = "Hiển thị tất cả nhãn hàng",
            description = "Trả về danh sách tất cả nhãn hàng trong hệ thống",
            tags = {"Nhãn hàng"}
    )
    @GetMapping("/brands")
    public ResponseEntity<BaseResponse<List<BrandResponse>>> index() {
        return returnSuccess(brandService.findAll());
    }

    @Operation(
            summary = "Tìm nhãn hàng theo ID",
            description = "Trả về thông tin chi tiết nhãn hàng theo ID chỉ định",
            tags = {"Nhãn hàng"}
    )
    @GetMapping("/brand/{id}")
    public ResponseEntity<BaseResponse<BrandResponse>> get(@PathVariable("id") Integer id) {
        return returnSuccess(brandService.get(id));
    }

    @Operation(
            summary = "Thêm nhãn hàng mới",
            description = "Thêm một nhãn hàng mới vào hệ thống",
            tags = {"Nhãn hàng"}
    )
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/addBrand")
    public ResponseEntity<BaseResponse<BrandResponse>> add(@ModelAttribute BrandRequest request) {
        return returnSuccess(brandService.add(request));
    }

    @Operation(
            summary = "Cập nhật nhãn hàng",
            description = "Thay đổi thông tin nhãn hàng theo ID chỉ định",
            tags = {"Nhãn hàng"}
    )
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/editBrand/{id}")
    public ResponseEntity<BaseResponse<BrandResponse>> update(
            @PathVariable("id") Integer id,
            @ModelAttribute BrandRequest request) {
        return returnSuccess(brandService.update(id, request));
    }

    @Operation(
            summary = "Xóa nhãn hàng",
            description = "Xóa nhãn hàng theo ID chỉ định",
            tags = {"Nhãn hàng"}
    )
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/deleteBrand/{id}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable("id") Integer id) {
        brandService.delete(id);
        return returnSuccess("Xóa nhãn hàng thành công");
    }
}