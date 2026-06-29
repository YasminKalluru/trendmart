package com.yasmin.trendmart.controller;

import com.yasmin.trendmart.entity.Wishlist;
import com.yasmin.trendmart.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;


    @PostMapping("/add")
    public Wishlist addToWishlist(
            @RequestBody Wishlist wishlist
    ) {

        return wishlistService.addToWishlist(wishlist);

    }


    @GetMapping("/all/{userId}")
    public List<Wishlist> getWishlistItems(
            @PathVariable Long userId
    ) {

        return wishlistService.getWishlistItems(userId);

    }


    @DeleteMapping("/remove/{id}")
    public String removeFromWishlist(
            @PathVariable Long id
    ) {

        wishlistService.removeFromWishlist(id);

        return "Item removed from wishlist";

    }

}
