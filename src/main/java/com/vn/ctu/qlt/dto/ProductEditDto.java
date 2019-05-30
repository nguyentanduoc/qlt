package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductEditDto {

    private Long id;

    private String productName;

    private String virtue;

    private String image;

    private List<SpecUnitDto> specUnits;

    private UnitDto unit;

    private ProducerDto producer;

    private List<DetailBillImportDto> detailBillImports;

    private List<PriceHistoryDto> priceHistorys;

    private List<ProductOfBranchDto> productsOfBranch;
}
