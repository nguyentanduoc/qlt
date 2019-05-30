package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.Set;

@Data
public class ProductDtoForExport {

    /** The id. */
    private Long id;

    /** The product name. */
    private String productName;

    /** The spec units. */
    private Set<SpecUnitDto> specUnits;

    /** The unit. */
    private UnitDto unit;

}
