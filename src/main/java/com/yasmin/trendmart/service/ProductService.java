package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.Product;
import com.yasmin.trendmart.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(long id) {
        return productRepository.findById(id);
    }
    public Page<Product> getProductsByPage(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return productRepository.findAll(pageable);

    }

    public Product updateProduct(long id, Product updatedProduct) {

        Product product = productRepository.findById(id);


        product.setPrice(updatedProduct.getPrice());
        product.setCategory(updatedProduct.getCategory());
        product.setDescription(updatedProduct.getDescription());
        product.setImageUrl(updatedProduct.getImageUrl());
        product.setName(updatedProduct.getName());
        product.setStock(updatedProduct.getStock());
        return productRepository.save(product);
    }
    public String deleteProduct(long id) {

        productRepository.deleteById(id);

        return "Product deleted successfully";
    }
}