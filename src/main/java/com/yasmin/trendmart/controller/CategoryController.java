package com.yasmin.trendmart.controller;

import com.yasmin.trendmart.entity.Category;
import com.yasmin.trendmart.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174"
})

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/add")
    public Category addCategory(
            @RequestBody Category category) {

        return categoryService.addCategory(category);

    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {

        return categoryService.getAllCategories();

    }

    @PutMapping("/update/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @RequestBody Category category) {

        return categoryService.updateCategory(id, category);

    }

    @DeleteMapping("/delete/{id}")
    public String deleteCategory(
            @PathVariable Long id) {

        categoryService.deleteCategory(id);

        return "Category Deleted Successfully";

    }

}
