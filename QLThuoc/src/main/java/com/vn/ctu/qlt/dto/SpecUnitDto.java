package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class SpecUnitDto {
    private Long id;

    private UnitDto unitIn;

    private UnitDto unitOut;

    private Integer amount;
}
