package com.example.website.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class Admin {

    @GetMapping("/detail-user")
    public String getUserDetail(@RequestParam int id, Model model) {
        model.addAttribute("user", id);
        return "admin/account-detail";
    }

    @GetMapping("/p/detail")
    public String getProductDetail(@RequestParam int id, Model model) {
        model.addAttribute("productId", id);
        return "admin/product-admin";
    }

    @GetMapping("/order/detail")
    public String getUserOrderDetail(@RequestParam int id, Model model) {
        model.addAttribute("orderId", id);
        return "auth/orderdetail";
    }

    @GetMapping("/manage/admin")
    public String admin(){
        return "/admin/manage";
    }

    @GetMapping("/manage/u")
    public String manageUser(){
        return "admin/manage-user";
    }

    @GetMapping("/manage/p")
    public String manageProduct(){
        return "admin/manage-product";
    }

    @GetMapping("/manage/o")
    public String manageOrder(){
        return "admin/manage-order";
    }

    @GetMapping("/manage/o/detail")
    public String getOrderDetail(@RequestParam int id, Model model) {
        model.addAttribute("orderId", id);
        return "admin/orderdetail-admin";
    }

    @GetMapping("manage/statistics")
    public String manageMoney(){
        return "admin/statistics";
    }

    @GetMapping("/tet")
    public String tet(){
        return "guest/tet";
    }
}
