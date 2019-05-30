package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PriceHistoryDto {

    private Long id;

    private ShopDto shop;

    private ProductDto  product;

    private Date date;

    private Double price;
}