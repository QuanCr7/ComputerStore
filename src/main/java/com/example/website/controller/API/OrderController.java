package com.example.website.controller.API;

import com.example.website.request.OrderRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.OrderResponse;
import com.example.website.response.PageOrderResponse;
import com.example.website.service.impl.OrderServiceImpl;
import com.example.website.utils.OrderStatus;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/order")
public class OrderController extends BaseController {
    private final OrderServiceImpl orderServiceImpl;

    @Operation(
            summary = "Lấy tất cả đơn hàng",
            description = "Lấy danh sách tất cả đơn hàng trong hệ thống (phân trang)",
            tags = {"Đơn hàng"}
    )
    @GetMapping("/all")
    public ResponseEntity<BaseResponse<PageOrderResponse>> getAllOrder(
            @RequestParam(defaultValue = "1") int page) {
        return returnSuccess(orderServiceImpl.findAll(page));
    }

    @Operation(
            summary = "Lấy chi tiết đơn hàng",
            description = "Lấy thông tin chi tiết của một đơn hàng theo ID",
            tags = {"Đơn hàng"}
    )
    @GetMapping("/detail/{id}")
    public ResponseEntity<BaseResponse<OrderResponse>> display(@PathVariable("id") Integer id) {
        return returnSuccess(orderServiceImpl.getById(id));
    }

    @Operation(
            summary = "Lấy đơn hàng của người dùng",
            description = "Lấy danh sách đơn hàng của người dùng hiện tại",
            tags = {"Đơn hàng"}
    )
    @GetMapping("/user")
    public ResponseEntity<BaseResponse<PageOrderResponse>> displayByUser(
            @RequestParam(defaultValue = "1") int page) {
        return returnSuccess(orderServiceImpl.getByUserId(page));
    }

    @Operation(
            summary = "Tạo đơn hàng mới",
            description = "Tạo đơn hàng mới với trạng thái PENDING và chi tiết sản phẩm",
            tags = {"Đơn hàng"}
    )
    @PostMapping("/pay")
    public ResponseEntity<BaseResponse<OrderResponse>> create(@Valid @RequestBody OrderRequest request) {
        // Xác thực orderDetails
        if (request.getOrderDetails() == null || request.getOrderDetails().isEmpty()) {
            throw new IllegalArgumentException("Order details cannot be empty");
        }
        // Đảm bảo trạng thái là PENDING đối với các đơn hàng mới
        if (request.getStatus() != null && request.getStatus() != OrderStatus.PENDING) {
            throw new IllegalArgumentException("New orders must have PENDING status");
        }
        return returnSuccess(orderServiceImpl.create(request, request.getOrderDetails()));
    }

    @Operation(
            summary = "Hủy đơn hàng",
            description = "Người dùng hủy đơn hàng của chính mình (chỉ khi đang ở trạng thái PENDING hoặc PROCESSING)",
            tags = {"Đơn hàng"}
    )
    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<BaseResponse<OrderResponse>> cancelOrder(@PathVariable("orderId") Integer orderId) {
        return returnSuccess(orderServiceImpl.cancelOrder(orderId));
    }

    @Operation(summary = "Admin cập nhật trạng thái đơn hàng")
    @PutMapping("/status/{orderId}")
    public ResponseEntity<BaseResponse<OrderResponse>> updateStatus(
            @PathVariable("orderId") Integer orderId,
            @RequestParam("status") String status) {
        return returnSuccess(orderServiceImpl.updateStatus(orderId, status));
    }
}
