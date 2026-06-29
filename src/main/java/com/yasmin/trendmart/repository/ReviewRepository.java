package com.yasmin.trendmart.repository;

import com.yasmin.trendmart.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Get all reviews for a product
    List<Review> findByProductId(Long productId);

    // Check if a user has already reviewed a product
    Optional<Review> findByUserIdAndProductId(Long userId, Long productId);

    // Get all reviews written by a user
    List<Review> findByUserId(Long userId);

}

