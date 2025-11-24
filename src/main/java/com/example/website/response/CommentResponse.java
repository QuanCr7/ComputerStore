package com.example.website.response;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private int commentId;
    private String comment;
    private int productId;
    private int userId;
    private LocalDateTime createdAt;
}
