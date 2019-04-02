package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class SaveExportDto {
    private ProductSelectionDto product;
    private SpecUnitSelectionDto specUnit;
    private Double amount;
    private Long priceHistory;
}
