package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetailBillImportDto {

    private BillImportDto billImport;

    private ProductDto product;

    private SpecUnitDto specUnit;

    private Double amount;

    private Double price;
}
