package com.example.website.response;

import lombok.*;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private int userId;
    private String username;
    private String fullName;
    private LocalDate dateOfBirth;
    private LocalDate dateCreate;
    private String image;
    private String email;
    private String phone;
    private String address;
}
