package com.yasmin.trendmart.repository;

import com.yasmin.trendmart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

    List<Cart> findByUserId(Long userId);
    Cart findByUserIdAndProductName(
            Long userId,
            String productName
    );
}