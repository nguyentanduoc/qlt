package com.vn.ctu.qlt.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ShopDto {

	private Long id;

	private String nameShop;

	private Date createdAt;

	private Date updatedAt;

	private Date establishAt;

	private Boolean isEnabled;

	private String fullName;
	
	private EmployeeDto employee;

}
