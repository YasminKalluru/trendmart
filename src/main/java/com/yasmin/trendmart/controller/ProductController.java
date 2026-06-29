package com.yasmin.trendmart.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.yasmin.trendmart.entity.Product;
import com.yasmin.trendmart.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping
    public Page<Product> getProductsByPage(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "6") int size) {

        return productService.getProductsByPage(page, size);

    }

    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PutMapping("/update/{id}")
    public Product updateProduct(
            @PathVariable long id,
            @RequestBody Product product) {

        return productService.updateProduct(id, product);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteProduct(@PathVariable long id) {

        return productService.deleteProduct(id);
    }

}