package com.example.website.controller.API;

import com.example.website.entity.CommentEntity;
import com.example.website.request.CommentRequest;
import com.example.website.response.BaseResponse;
import com.example.website.response.CommentResponse;
import com.example.website.response.PageCommentResponse;
import com.example.website.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/comment")
public class CommentController extends BaseController {
    private final CommentService commentService;

    @Operation(
            summary = "Lấy danh sách bình luận",
            description = "Trả về tất cả bình luận trong hệ thống",
            tags = {"Bình luận"}
    )
    @GetMapping("")
    public ResponseEntity<BaseResponse<PageCommentResponse>> index(
            @RequestParam(defaultValue = "1") int page) {
        return returnSuccess(commentService.findAll(page));
    }

    @Operation(
            summary = "Lấy bình luận theo sách",
            description = "Trả về tất cả bình luận của một cuốn sách cụ thể",
            tags = {"Bình luận"}
    )
    @GetMapping("/p/{name}")
    public ResponseEntity<BaseResponse<PageCommentResponse>> getCommentByProduct(
            @RequestParam(defaultValue = "1") int page,
            @PathVariable("name") String name) {
        return returnSuccess(commentService.findAllByProduct(page,name));
    }

    @Operation(
            summary = "Lấy bình luận theo ID",
            description = "Trả về thông tin chi tiết bình luận theo ID",
            tags = {"Bình luận"}
    )
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse<CommentEntity>> getCommentById(@PathVariable("id") int id) {
        return returnSuccess(commentService.get(id));
    }

    @Operation(
            summary = "Thêm bình luận mới",
            description = "Thêm bình luận mới cho sản phẩm",
            tags = {"Bình luận"}
    )
    @PostMapping("/addComment")
    public ResponseEntity<BaseResponse<CommentResponse>> add(
            @RequestBody CommentRequest commentRequest) {
        return returnSuccess(commentService.add(commentRequest));
    }

    @Operation(
            summary = "Xóa bình luận",
            description = "Xóa bình luận theo ID chỉ định",
            tags = {"Bình luận"}
    )
    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<BaseResponse<String>> delete(@PathVariable("id") int id) {
        commentService.delete(id);
        return returnSuccess("Xóa bình luận thành công");
    }
}