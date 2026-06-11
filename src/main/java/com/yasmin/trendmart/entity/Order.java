package com.yasmin.trendmart.entity;

import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @NotBlank
    private String customerName;

    @NotNull
    private Double totalAmount;

    @NotBlank
    private String status;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;

}