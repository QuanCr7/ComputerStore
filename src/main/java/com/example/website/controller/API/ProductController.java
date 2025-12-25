package com.example.website.controller.API;

import com.example.website.request.ProductAttributeRequest;
import com.example.website.request.ProductRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.PageProductResponse;
import com.example.website.response.ProductResponse;
import com.example.website.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("")
public class ProductController extends BaseController {
    private final ProductService productService;

    @Operation(
            summary = "Hiển thị danh sách sản phẩm trang chủ",
            description = "Trả về danh sách sản phẩm phân trang cho trang chủ, mặc định trang 1",
            tags = {"Sản phẩm"}
    )
    @GetMapping("/home")
    public ResponseEntity<BaseResponse<PageProductResponse>> index(
            @RequestParam(defaultValue = "1") int page
    ) {
        return returnSuccess(productService.index(page));
    }

    @Operation(
            summary = "Lấy thông tin sản phẩm theo ID",
            description = "Trả về chi tiết một sản phẩm dựa trên ID được cung cấp",
            tags = {"Sản phẩm"}
    )
    @GetMapping("/p/searchId/{id}")
    public ResponseEntity<BaseResponse<ProductResponse>> getById(
            @PathVariable("id") Integer id
    ){
        return returnSuccess(productService.get(id));
    }

    @Operation(
            summary = "Thêm sản phẩm mới",
            description = "Thêm một sản phẩm mới vào hệ thống kèm theo các thuộc tính động",
            tags = {"Sản phẩm"}
    )
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/addProduct")
    public ResponseEntity<BaseResponse<ProductResponse>> add(
            @ModelAttribute ProductRequest request
    ){
        ProductResponse response = productService.add(request, request.getAttributes());
        return returnSuccess(response);
    }

    @Operation(
            summary = "Xóa sản phẩm",
            description = "Xóa sản phẩm khỏi hệ thống theo ID chỉ định",
            tags = {"Sản phẩm"}
    )
    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/deleteProduct/{id}")
    public ResponseEntity<BaseResponse<String>> delete(
            @PathVariable("id") Integer id
    ){
        productService.delete(id);
        return returnSuccess("Deleted success");
    }

    @Operation(
            summary = "Lấy thông tin sản phẩm theo điều kiện",
            description = "Trả về tất cả sản phẩm dựa theo điều kiện tìm kiếm",
            tags = {"Sản phẩm"}
    )
    @GetMapping("/p/search")
    public ResponseEntity<BaseResponse<PageProductResponse>> search(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String sort,
            @RequestParam(defaultValue = "1") int page
    ){
        return returnSuccess(productService.getByCondition(page,name,brand,category,sort));
    }

    @Operation(summary = "Cập nhật sản phẩm", tags = {"Sản phẩm"})
    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/product/update/{id}")
    public ResponseEntity<BaseResponse<ProductResponse>> update(
            @PathVariable("id") Integer id,
            @ModelAttribute ProductRequest request
    ) {
        List<ProductAttributeRequest> attributes = request.getAttributes();
        ProductResponse response = productService.update(id, request, attributes);
        return returnSuccess(response);
    }
}