package com.yasmin.trendmart.service;
import com.yasmin.trendmart.exception.OrderNotFoundException;
import com.yasmin.trendmart.entity.OrderItem;
import com.yasmin.trendmart.entity.Order;
import com.yasmin.trendmart.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.yasmin.trendmart.repository.ProductRepository;
import com.yasmin.trendmart.entity.Product;
import java.util.List;

@Service
public class OrderService {


    @Autowired
    private OrderRepository orderRepository;

    public Order placeOrder(Order order) {

        for (OrderItem item : order.getItems()) {

            Product product = productRepository.findByName(item.getProductName());

            if (product != null) {

                int remainingStock = product.getStock() - item.getQuantity();

                if (remainingStock < 0) {

                    throw new RuntimeException(
                            product.getName() + " is out of stock."
                    );

                }

                product.setStock(remainingStock);

                productRepository.save(product);

            }

        }

        return orderRepository.save(order);

    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order updateOrderStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }
    public List<Order> getOrdersByUserId(Long userId) {

        return orderRepository.findByUserId(userId);

    }
    @Autowired
    private ProductRepository productRepository;

}