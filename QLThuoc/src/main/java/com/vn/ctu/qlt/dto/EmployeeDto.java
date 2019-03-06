package com.vn.ctu.qlt.dto;

import java.util.Date;
import java.util.Set;

public class EmployeeDto {

	private Long id;
	private String nameEmployee;
	private Date birthDay;
	private String numberPhone;
	private String address;
	private String username;
	private Set<BranchsSeletionDto> branchs;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameEmployee() {
		return nameEmployee;
	}

	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
	}

	public Date getBirthDay() {
		return birthDay;
	}

	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	public String getNumberPhone() {
		return numberPhone;
	}

	public void setNumberPhone(String numberPhone) {
		this.numberPhone = numberPhone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Set<BranchsSeletionDto> getBranchs() {
		return branchs;
	}

	public void setBranchs(Set<BranchsSeletionDto> branchs) {
		this.branchs = branchs;
	}

}
