package com.example.website.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Tet {
    public static void main(String[] args) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();

        System.out.println(encoder.encode("admin953"));
        System.out.println(encoder.encode("ronaldo7"));
        System.out.println(encoder.encode("messi10"));
        System.out.println(encoder.encode("bienquan7"));
        System.out.println(encoder.encode("jokermk2"));
    }
}
