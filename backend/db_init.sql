-- 1. 데이터베이스 생성 (IF NOT EXISTS 추가)
CREATE DATABASE IF NOT EXISTS TraviaDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE TraviaDB;

-- 사용자 기본 정보 테이블 (프로필 사진 URL 포함, 필수가 아님)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    profile_image_url VARCHAR(255) NULL COMMENT '사용자/가이드 공통 프로필 사진 URL (필수 아님)',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 가이드 프로필 테이블 (users와 1:1 관계)
CREATE TABLE IF NOT EXISTS guide_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    specialty VARCHAR(100),
    experience_years INT,
    rating FLOAT DEFAULT 0.0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 여행 콘텐츠(상품) 테이블
CREATE TABLE IF NOT EXISTS contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price INT,
    description TEXT,
    location VARCHAR(100) NOT NULL,
    guide_id INT, 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (guide_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 콘텐츠 이미지 테이블 (contents와 1:N 관계)
CREATE TABLE IF NOT EXISTS content_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    is_main TINYINT(1) DEFAULT 0,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
);

-- 콘텐츠 영상 테이블 (contents와 1:N 관계)
CREATE TABLE IF NOT EXISTS content_video (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content_id INT NOT NULL,
    video_url VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
);

-- 예약 테이블
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    booking_date DATETIME NOT NULL,
    status ENUM('CONFIRMED', 'COMPLETED', 'CANCELED') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE
);

-- 리뷰 테이블 (bookings와 1:1 관계)
CREATE TABLE IF NOT EXISTS reviews (
    booking_id INT PRIMARY KEY,
    review_text TEXT NOT NULL,
    rating FLOAT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
);

-- 태그 목록 테이블
CREATE TABLE IF NOT EXISTS tags (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tag_name VARCHAR(50) NOT NULL UNIQUE
);

-- 리뷰-태그 연결 테이블 (다대다(N:M) 관계)
CREATE TABLE IF NOT EXISTS review_tags (
    review_id INT NOT NULL,
    tag_id INT NOT NULL,
    PRIMARY KEY (review_id, tag_id),
    FOREIGN KEY (review_id) REFERENCES reviews(booking_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);
