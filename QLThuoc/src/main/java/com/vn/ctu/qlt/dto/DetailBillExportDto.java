package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailBillExportDto {

    private ProductDto product;

    private SpecUnitDto specUnit;

    private PriceHistoryDto priceHistory;

    private Double amount;
}
