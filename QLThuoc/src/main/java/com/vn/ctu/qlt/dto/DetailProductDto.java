package com.vn.ctu.qlt.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class DetailProductDto {

	@NotNull
	@NotBlank
	private ProductSelectionDto product;

	@NotNull
	@NotBlank
	private SpecUnitSelectionDto specUnit;

	@NotNull
	@NotBlank
	private Double amount;

	@NotNull
	@NotBlank
	private Double price;
}
