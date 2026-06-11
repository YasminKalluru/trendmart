package com.yasmin.trendmart.repository;

import com.yasmin.trendmart.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}