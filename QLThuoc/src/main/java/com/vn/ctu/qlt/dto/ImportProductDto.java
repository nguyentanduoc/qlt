package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.Set;


@Data
public class ImportProductDto {

	private Set<DetailProductDto> data;

	private BranchDto branch;

	private String noteRequest;
}
