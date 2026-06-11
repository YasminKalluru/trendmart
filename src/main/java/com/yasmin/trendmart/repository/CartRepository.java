package com.yasmin.trendmart.repository;

import com.yasmin.trendmart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
}