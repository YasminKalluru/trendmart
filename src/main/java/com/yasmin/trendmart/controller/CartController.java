package com.yasmin.trendmart.controller;

import com.yasmin.trendmart.entity.Cart;
import com.yasmin.trendmart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {

        return cartService.addToCart(cart);

    }

    @GetMapping("/all/{userId}")
    public List<Cart> getCartItems(
            @PathVariable Long userId
    ) {
        return cartService.getCartItems(userId);
    }

    @DeleteMapping("/remove/{id}")
    public String removeFromCart(
            @PathVariable Long id
    ) {

        cartService.removeFromCart(id);

        return "Item removed";

    }

    @PutMapping("/increase/{id}")
    public Cart increaseQuantity(
            @PathVariable Long id
    ) {

        return cartService.increaseQuantity(id);

    }

    @PutMapping("/decrease/{id}")
    public Cart decreaseQuantity(
            @PathVariable Long id
    ) {

        return cartService.decreaseQuantity(id);

    }
}