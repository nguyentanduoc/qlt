package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class ImportProductDto {

	private ProductSelectionDto product;
	
	private SpecUnitSelectionDto specUnit;
	
	private Integer amount;
	
	private Double price;

}
