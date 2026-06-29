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

        Cart existingCartItem =
                cartRepository.findByUserIdAndProductName(
                        cart.getUserId(),
                        cart.getProductName()
                );

        if (existingCartItem != null) {

            existingCartItem.setQuantity(
                    existingCartItem.getQuantity() + 1
            );

            return cartRepository.save(existingCartItem);
        }

        return cartRepository.save(cart);
    }

    public List<Cart> getCartItems(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(Long id) {

        cartRepository.deleteById(id);

    }

    public Cart increaseQuantity(Long id) {

        Cart cart = cartRepository.findById(id).orElse(null);

        if (cart != null) {

            cart.setQuantity(cart.getQuantity() + 1);

            return cartRepository.save(cart);

        }

        return null;
    }

    public Cart decreaseQuantity(Long id) {

        Cart cart = cartRepository.findById(id).orElse(null);

        if (cart != null && cart.getQuantity() > 1) {

            cart.setQuantity(cart.getQuantity() - 1);

            return cartRepository.save(cart);

        }

        return cart;
    }
}