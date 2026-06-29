package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.Product;
import com.yasmin.trendmart.entity.Review;
import com.yasmin.trendmart.repository.ProductRepository;
import com.yasmin.trendmart.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductRepository productRepository;

    // Add or Update Review
    public Review saveReview(Review review) {

        Optional<Review> existingReview =
                reviewRepository.findByUserIdAndProductId(
                        review.getUserId(),
                        review.getProductId()
                );

        Review savedReview;

        if (existingReview.isPresent()) {

            Review oldReview = existingReview.get();

            oldReview.setRating(review.getRating());
            oldReview.setComment(review.getComment());

            savedReview = reviewRepository.save(oldReview);

        } else {

            savedReview = reviewRepository.save(review);

        }

        updateProductRating(review.getProductId());

        return savedReview;
    }

    // Get Reviews By Product
    public List<Review> getReviewsByProduct(Long productId) {

        return reviewRepository.findByProductId(productId);

    }

    // Delete Review
    public void deleteReview(Long id) {

        Review review = reviewRepository.findById(id).orElse(null);

        if (review != null) {

            Long productId = review.getProductId();

            reviewRepository.deleteById(id);

            updateProductRating(productId);

        }

    }

    // Calculate Average Rating
    private void updateProductRating(Long productId) {

        List<Review> reviews =
                reviewRepository.findByProductId(productId);

        double average = reviews.stream()
                .mapToInt(Review::getRating)
                .average()
                .orElse(0);

        Product product =
                productRepository.findById(productId).orElse(null);

        if (product != null) {

            product.setRating(average);

            productRepository.save(product);

        }

    }

}