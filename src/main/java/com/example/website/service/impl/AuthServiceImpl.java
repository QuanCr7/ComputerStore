package com.example.website.service.impl;

import com.example.website.configuration.CustomUserDetails;
import com.example.website.configuration.JwtTokenProvider;
import com.example.website.entity.UserEntity;
import com.example.website.repository.UserRepository;
import com.example.website.request.UserLoginRequest;
import com.example.website.request.UserRegisterRequest;
import com.example.website.response.UserLoginResponse;
import com.example.website.response.UserResponse;
import com.example.website.service.AuthService;
import com.example.website.utils.Role;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Slf4j
@RequiredArgsConstructor
@Service
public class AuthServiceImpl implements AuthService {
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${jwt.blacklist-duration:86400000}")
    private long blacklistDuration;
    private final Map<String, Long> tokenBlacklist = new ConcurrentHashMap<>();

    private final Path rootLocation = Paths.get("src/main/resources/static/images/user");

    private final ConcurrentHashMap<String, Long> tokenExpiryMap = new ConcurrentHashMap<>();

    @Override
    public UserResponse registerUser(UserRegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username Already Exists");
        }

        if (request.getPhone() != null && userRepository.existsByPhone(request.getPhone())) {
            throw new RuntimeException("Phone number already exists");
        }

        if (request.getEmail() != null && userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        Role userRole = Role.CUSTOMER;
        String image = saveImage(request.getImage());

        UserEntity user = UserEntity.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .fullName(request.getFullName())
                .dateOfBirth(request.getDateOfBirth())
                .dateCreate(LocalDate.now())
                .image(image)
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .role(userRole)
                .build();

        UserEntity savedUser = userRepository.save(user);
        return response(savedUser);
    }

    @Override
    public UserLoginResponse login(UserLoginRequest request) {
        try{
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

            String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
            String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);
            Date accessTokenExpiry = jwtTokenProvider.extractExpiration(accessToken);
            Date refreshTokenExpiry = jwtTokenProvider.extractExpiration(refreshToken);

            return UserLoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(refreshToken)
                    .accessTokenExpiryDate(accessTokenExpiry)
                    .refreshTokenExpiryDate(refreshTokenExpiry)
                    .build();
        } catch(AuthenticationException e) {
            throw new RuntimeException("Tên đăng nhập hoặc mật khẩu không chính xác!");
        }
    }

    @Override
    public void initiatePasswordReset(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Tên đăng nhập không tồn tại!"));

        String token = UUID.randomUUID().toString();
        user.setPasswordToken(token);
        userRepository.save(user);

        long expiryTime = System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(15);
        tokenExpiryMap.put(token, expiryTime);

        String resetLink = "http://localhost:8080/reset-password?token=" + token;

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Đặt lại mật khẩu");

            String htmlContent = """
            <!DOCTYPE html>
            <html lang="vi">
            <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
                <div style="max-width:600px; margin:auto; background:#fff; padding:30px; border-radius:8px;">
                    <h2 style="color:#0d6efd;">Đặt lại mật khẩu</h2>
                    <p>Xin chào <b>%s</b>,</p>
                    <p>Bạn đã yêu cầu đặt lại mật khẩu. Nhấn vào nút bên dưới:</p>
    
                    <p style="text-align:center; margin:30px 0;">
                        <a href="%s"
                           style="background:#0d6efd; color:white; padding:12px 24px;
                                  text-decoration:none; border-radius:5px;">
                            Đặt lại mật khẩu
                        </a>
                    </p>
    
                    <p style="font-size:13px; color:#777;">
                        Link sẽ hết hạn sau 15 phút.
                    </p>
                </div>
            </body>
            </html>
            """.formatted(user.getUsername(), resetLink);

            helper.setText(htmlContent, true);
            mailSender.send(message);

        } catch (Exception e) {
            throw new RuntimeException("Gửi email thất bại", e);
        }
    }

    @Override
    public boolean resetPassword(String token, String newPassword) {
        Long expiryTime = tokenExpiryMap.get(token);
        if (expiryTime == null || System.currentTimeMillis() > expiryTime) {
            return false;
        }
        UserEntity user = userRepository.findByPasswordToken(token);
        if (user != null) {
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setPasswordToken(null);
            userRepository.save(user);
            tokenExpiryMap.remove(token);
            return true;
        }
        return false;
    }

    @Override
    public String saveImage(MultipartFile imageFile) {
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String fileName = imageFile.getOriginalFilename();
                Path filePath = rootLocation.resolve(fileName);

                Files.createDirectories(filePath.getParent());
                Files.write(filePath, imageFile.getBytes());

                return fileName;
            } catch (IOException e) {
                log.error("Failed to save image file: {}", e.getMessage(), e);
                throw new RuntimeException("Failed to save image file", e);
            }
        }
        return null;
    }

    public UserResponse response(UserEntity response){
        return UserResponse.builder()
                .username(response.getUsername())
                .fullName(response.getFullName())
                .dateOfBirth(response.getDateOfBirth())
                .dateCreate(response.getDateCreate())
                .image(response.getImage())
                .email(response.getEmail())
                .phone(response.getPhone())
                .address(response.getAddress())
                .build();
    }

    //cach su dung refreshToken cu ma ko tao moi
    @Override
    public UserLoginResponse refreshToken(String refreshToken) {
        jwtTokenProvider.validateToken(refreshToken);
        jwtTokenProvider.validateRefreshToken(refreshToken);

        String username = jwtTokenProvider.extractUsername(refreshToken);
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        CustomUserDetails userDetails = new CustomUserDetails(user);
        String newAccessToken = jwtTokenProvider.generateAccessToken(userDetails);

        return UserLoginResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken)
                .accessTokenExpiryDate(jwtTokenProvider.extractExpiration(newAccessToken))
                .refreshTokenExpiryDate(jwtTokenProvider.extractExpiration(refreshToken))
                .build();
    }

    @Override
    public void logout(String token) {
        if (!jwtTokenProvider.validateToken(token)) {
            throw new RuntimeException("Invalid token");
        }

        // Blacklist access token đến khi hết hạn
        Date expiration = jwtTokenProvider.extractExpiration(token);
        long remainingTime = expiration.getTime() - System.currentTimeMillis();

        if (remainingTime > 0) {
            addToBlacklist(token, remainingTime);
        }

        SecurityContextHolder.clearContext();
    }


    public void addToBlacklist(String token, long ttlMillis) {
        long expiryTime = System.currentTimeMillis() + ttlMillis;
        tokenBlacklist.put(token, expiryTime);
        log.debug("Added token to blacklist, expires at: {}", new Date(expiryTime));
    }

    public boolean isBlacklisted(String token) {
        Long expiryTime = tokenBlacklist.get(token);
        if (expiryTime == null) {
            return false;
        }

        // Tự động xóa nếu đã hết hạn
        if (System.currentTimeMillis() > expiryTime) {
            tokenBlacklist.remove(token);
            return false;
        }

        return true;
    }

    // Phương thức dọn dẹp định kỳ (tùy chọn)
    @Scheduled(fixedRate = 3600000)
    public void cleanupExpiredTokens() {
        long now = System.currentTimeMillis();
        tokenBlacklist.entrySet().removeIf(entry -> entry.getValue() < now);
        log.info("Cleaned up expired blacklisted tokens");
    }
}
