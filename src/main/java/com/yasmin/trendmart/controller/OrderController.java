package com.yasmin.trendmart.controller;

import  com.yasmin.trendmart.dto.ApiResponse;
import com.yasmin.trendmart.entity.Order;
import com.yasmin.trendmart.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ApiResponse<Order> placeOrder(@Valid @RequestBody Order order) {

        Order savedOrder = orderService.placeOrder(order);

        return new ApiResponse<>(
                true,
                "Order placed successfully",
                savedOrder
        );
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @PutMapping("/status/{id}")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return orderService.updateOrderStatus(id, status);
    }
}