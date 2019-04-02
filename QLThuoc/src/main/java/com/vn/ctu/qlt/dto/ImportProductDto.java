package com.vn.ctu.qlt.dto;

import java.util.Set;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Data
public class ImportProductDto {

	@NotBlank
	@NotNull
	private Set<DetailProductDto> data;

	@NotBlank
	@NotNull
	private BranchDto branch;

	@NotBlank
	private String noteRequest;
}
