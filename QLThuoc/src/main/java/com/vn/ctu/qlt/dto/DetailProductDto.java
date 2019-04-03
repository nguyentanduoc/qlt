package com.vn.ctu.qlt.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class DetailProductDto {

	private ProductSelectionDto product;

	private SpecUnitSelectionDto specUnit;

	private Double amount;

	private Double price;
}
