package com.vn.ctu.qlt.dto;

import java.util.Date;
import java.util.Set;

/**
 * The Class EmployeeDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
public class EmployeeDto {

	/** The id. */
	private Long id;
	
	/** The name employee. */
	private String nameEmployee;
	
	/** The birth day. */
	private Date birthDay;
	
	/** The number phone. */
	private String numberPhone;
	
	/** The address. */
	private String address;
	
	/** The username. */
	private String username;
	
	/** The date join. */
	private Date dateJoin;
	
	/** The branchs. */
	private Set<BranchsSeletionDto> branchs;
	
	/** The roles. */
	private Set<RoleSeletionDto> roles;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the name employee.
	 *
	 * @return the name employee
	 */
	public String getNameEmployee() {
		return nameEmployee;
	}

	/**
	 * Sets the name employee.
	 *
	 * @param nameEmployee the new name employee
	 */
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
	}

	/**
	 * Gets the birth day.
	 *
	 * @return the birth day
	 */
	public Date getBirthDay() {
		return birthDay;
	}

	/**
	 * Sets the birth day.
	 *
	 * @param birthDay the new birth day
	 */
	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
	}

	/**
	 * Gets the number phone.
	 *
	 * @return the number phone
	 */
	public String getNumberPhone() {
		return numberPhone;
	}

	/**
	 * Sets the number phone.
	 *
	 * @param numberPhone the new number phone
	 */
	public void setNumberPhone(String numberPhone) {
		this.numberPhone = numberPhone;
	}

	/**
	 * Gets the address.
	 *
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * Sets the address.
	 *
	 * @param address the new address
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * Gets the username.
	 *
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Sets the username.
	 *
	 * @param username the new username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Gets the branchs.
	 *
	 * @return the branchs
	 */
	public Set<BranchsSeletionDto> getBranchs() {
		return branchs;
	}

	/**
	 * Sets the branchs.
	 *
	 * @param branchs the new branchs
	 */
	public void setBranchs(Set<BranchsSeletionDto> branchs) {
		this.branchs = branchs;
	}

	/**
	 * Gets the roles.
	 *
	 * @return the roles
	 */
	public Set<RoleSeletionDto> getRoles() {
		return roles;
	}

	/**
	 * Sets the roles.
	 *
	 * @param roles the new roles
	 */
	public void setRoles(Set<RoleSeletionDto> roles) {
		this.roles = roles;
	}

	/**
	 * Gets the date join.
	 *
	 * @return the date join
	 */
	public Date getDateJoin() {
		return dateJoin;
	}

	/**
	 * Sets the date join.
	 *
	 * @param dateJoin the new date join
	 */
	public void setDateJoin(Date dateJoin) {
		this.dateJoin = dateJoin;
	}
}
