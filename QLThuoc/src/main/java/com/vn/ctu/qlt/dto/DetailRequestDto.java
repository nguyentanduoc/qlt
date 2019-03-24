package com.vn.ctu.qlt.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class DetailRequestDto implements Serializable {/**
	 * 
	 */
	private static final long serialVersionUID = 603032100455809226L;
	
	private String product;
	
	private Double amount;
	
	private String unit;

}
