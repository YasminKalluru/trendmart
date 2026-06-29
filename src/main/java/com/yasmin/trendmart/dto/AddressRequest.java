package com.yasmin.trendmart.dto;

import lombok.Data;

@Data
public class AddressRequest {

    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;

}
