package com.example.website.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Product {
    @GetMapping("/")
    public String home() {
        return "guest/home";
    }

    @GetMapping("/about")
    public String about() {
        return "guest/about";
    }

    @GetMapping("/search")
    public String search() {
        return "guest/search";
    }

    @GetMapping("/update-product")
    public String update(@RequestParam int id, Model model) {
        model.addAttribute("productId", id);
        return "admin/update-product";
    }

    @GetMapping("/add")
    public String create() {
        return "admin/add-product";
    }

    @GetMapping("/detail")
    public String detail(@RequestParam int id, Model model) {
        model.addAttribute("productId", id);
        return "guest/detail-product";
    }
}
