package com.example.website.controller.API;

import com.example.website.request.UserRegisterRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.PageUserResponse;
import com.example.website.response.UserResponse;
import com.example.website.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/account")
public class AccountController extends BaseController {
    private final UserService userService;

    @Operation(
            summary = "Lấy danh sách người dùng",
            description = "Lấy tất cả danh sách người dùng trong hệ thống",
            tags = {"Tài khoản"}
    )
    @GetMapping("")
    public ResponseEntity<BaseResponse<PageUserResponse>> index(
            @RequestParam(defaultValue = "1") int page
    ) {
        return returnSuccess(userService.findAll(page));
    }

    @Operation(
            summary = "Lấy thông tin người dùng theo username",
            description = "Lấy thông tin chi tiết người dùng dựa trên username từ token",
            tags = {"Tài khoản"}
    )
    @GetMapping("/profile")
    public ResponseEntity<BaseResponse<UserResponse>> getCurrentUser() {
        return returnSuccess(userService.getCurrentUser());
    }

    @Operation(
            summary = "Lấy thông tin người dùng",
            description = "Lấy thông tin chi tiết người dùng theo ID",
            tags = {"Tài khoản"}
    )
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> get(@PathVariable("id") int id) {
        return returnSuccess(userService.get(id));
    }

    @Operation(
            summary = "Cập nhật người dùng",
            description = "Cập nhật thông tin người dùng theo ID",
            tags = {"Tài khoản"}
    )
    @PutMapping("/editUser/{id}")
    public ResponseEntity<BaseResponse<UserResponse>> update(
            @PathVariable("id") int id,
            @RequestBody UserRegisterRequest request) {
        return returnSuccess(userService.update(id, request));
    }

    @Operation(
            summary = "Xóa người dùng",
            description = "Xóa người dùng theo ID",
            tags = {"Tài khoản"}
    )
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable("id") int id) {
        userService.delete(id);
        return returnSuccess("Xóa người dùng thành công");
    }

    @Operation(
            summary = "Tìm kiếm người dùng theo điều kiện",
            description = "Tìm tất cả người dùng theo điều kiện",
            tags = {"Tài khoản"}
    )
    @GetMapping("/search")
    public ResponseEntity<BaseResponse<PageUserResponse>> search(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam Integer id,
            @RequestParam String phone,
            @RequestParam(defaultValue = "1") int page) {
        return returnSuccess(userService.getByCondition(page,name,email,id,phone));
    }
}