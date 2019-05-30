package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDtoList {
    private Long id;

    private String productName;

    private String virtue;

    private String unit;

    private String producer;
}
