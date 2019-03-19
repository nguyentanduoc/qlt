package com.vn.ctu.qlt.dto;

import java.util.Set;

import lombok.Data;

@Data
public class ImportProductDto {

	private Set<DetailProductDto> data;
	
	private BranchDto branch;

}
