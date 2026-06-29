package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.Wishlist;
import com.yasmin.trendmart.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;


    public Wishlist addToWishlist(Wishlist wishlist) {

        Wishlist existingItem =
                wishlistRepository.findByUserIdAndProductName(
                        wishlist.getUserId(),
                        wishlist.getProductName()
                );

        if (existingItem != null) {

            return existingItem;
        }

        return wishlistRepository.save(wishlist);
    }


    public List<Wishlist> getWishlistItems(Long userId) {

        return wishlistRepository.findByUserId(userId);

    }


    public void removeFromWishlist(Long id) {

        wishlistRepository.deleteById(id);

    }

}