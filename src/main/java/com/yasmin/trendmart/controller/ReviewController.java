package com.yasmin.trendmart.controller;

import com.yasmin.trendmart.entity.Review;
import com.yasmin.trendmart.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // Add or Update Review
    @PostMapping("/add")
    public Review saveReview(@RequestBody Review review) {

        return reviewService.saveReview(review);

    }

    // Get Reviews of a Product
    @GetMapping("/{productId}")
    public List<Review> getReviewsByProduct(
            @PathVariable Long productId) {

        return reviewService.getReviewsByProduct(productId);

    }

    // Delete Review
    @DeleteMapping("/delete/{id}")
    public String deleteReview(
            @PathVariable Long id) {

        reviewService.deleteReview(id);

        return "Review Deleted Successfully";



    }



}