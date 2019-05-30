package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductEditRequestDto {

    private Long id;

    private String productName;

    private String virtue;

    private List<Long> specUnits;

    private Long unit;

    private ProducerDto producer;
}
