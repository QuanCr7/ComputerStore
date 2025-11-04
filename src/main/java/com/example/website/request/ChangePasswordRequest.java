package com.example.website.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String username;
    private String oldPassword;
    private String newPassword;
}
