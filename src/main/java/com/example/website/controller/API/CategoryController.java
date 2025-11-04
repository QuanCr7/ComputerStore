package com.example.website.controller.API;

import com.example.website.request.CategoryRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.CategoryResponse;
import com.example.website.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class CategoryController extends BaseController {
    private final CategoryService categoryService;

    @Operation(
            summary = "Hiển thị tất cả thể loại",
            description = "Trả về danh sách tất cả thể loại sách trong hệ thống",
            tags = {"Thể loại"}
    )
    @GetMapping("categories")
    public ResponseEntity<BaseResponse<List<CategoryResponse>>> index() {
        return returnSuccess(categoryService.findAll());
    }

    @Operation(
            summary = "Tìm thể loại theo ID",
            description = "Trả về thông tin chi tiết thể loại theo ID chỉ định",
            tags = {"Thể loại"}
    )
    @GetMapping("/category/{id}")
    public ResponseEntity<BaseResponse<CategoryResponse>> get(@PathVariable("id") Integer id) {
        return returnSuccess(categoryService.get(id));
    }

    @Operation(
            summary = "Thêm thể loại mới",
            description = "Thêm một thể loại sách mới vào hệ thống",
            tags = {"Thể loại"}
    )
    @PostMapping("/addCategory")
    public ResponseEntity<BaseResponse<CategoryResponse>> add(@ModelAttribute CategoryRequest request) {
        return returnSuccess(categoryService.add(request));
    }

    @Operation(
            summary = "Cập nhật thể loại",
            description = "Thay đổi thông tin thể loại theo ID chỉ định",
            tags = {"Thể loại"}
    )
    @PutMapping("/editCategory/{id}")
    public ResponseEntity<BaseResponse<CategoryResponse>> update(
            @PathVariable("id") Integer id,
            @ModelAttribute CategoryRequest request) {
        return returnSuccess(categoryService.update(id, request));
    }

    @Operation(
            summary = "Xóa thể loại",
            description = "Xóa thể loại sách theo ID chỉ định",
            tags = {"Thể loại"}
    )
    @DeleteMapping("/deleteCategory/{id}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable("id") Integer id) {
        categoryService.delete(id);
        return returnSuccess("Xóa thể loại thành công");
    }
}