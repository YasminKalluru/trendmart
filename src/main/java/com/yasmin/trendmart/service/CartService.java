package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.Cart;
import com.yasmin.trendmart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartItems() {
        return cartRepository.findAll();
    }
    public void removeFromCart(Long id) {
        cartRepository.deleteById(id);
    }
}