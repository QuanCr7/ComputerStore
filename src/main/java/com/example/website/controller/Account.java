package com.example.website.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class Account {

    @GetMapping("/me")
    public String getUserProfile() {
        return "auth/profile";
    }

    @GetMapping("/me/order")
    public String getUserOrder() {
        return "auth/orderuser";
    }

    @GetMapping("/me/order/detail")
    public String getUserOrderDetail(@RequestParam int id, Model model) {
        model.addAttribute("orderId", id);
        return "auth/orderdetail";
    }

    @GetMapping("/update")
    public String updateProfile() {
        return "auth/update-user";
    }

    @GetMapping("/change-password")
    public String changePasswordPage() {
        return "auth/change-password";
    }

    @GetMapping("/forgot-password")
    public String showForgotPasswordPage() {
        return "guest/forgotpassword";
    }

    @GetMapping("/reset-password")
    public String showResetPasswordPage(@RequestParam String token, Model model) {
        model.addAttribute("token", token);
        return "auth/resetpassword";
    }

}