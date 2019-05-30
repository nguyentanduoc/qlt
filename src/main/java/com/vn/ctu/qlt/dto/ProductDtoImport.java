package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDtoImport {

    private Long id;

    private String productName;

    private String virtue;

    private String image;

    private List<SpecUnitDto> specUnits;

    private UnitDto unit;

    private ProducerDto producer;

}
