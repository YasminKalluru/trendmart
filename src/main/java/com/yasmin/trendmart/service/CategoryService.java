package com.yasmin.trendmart.service;

import com.yasmin.trendmart.entity.Category;
import com.yasmin.trendmart.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Add Category
    public Category addCategory(Category category) {

        return categoryRepository.save(category);

    }

    // Get All Categories
    public List<Category> getAllCategories() {

        return categoryRepository.findAll();

    }

    // Update Category
    public Category updateCategory(Long id, Category updatedCategory) {

        Category category =
                categoryRepository.findById(id).orElse(null);

        if (category == null) {

            return null;

        }

        category.setName(updatedCategory.getName());
        category.setDescription(updatedCategory.getDescription());

        return categoryRepository.save(category);

    }

    // Delete Category
    public void deleteCategory(Long id) {

        categoryRepository.deleteById(id);

    }

}