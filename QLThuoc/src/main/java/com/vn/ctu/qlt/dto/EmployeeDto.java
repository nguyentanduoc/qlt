package com.vn.ctu.qlt.dto;

import java.util.Date;
import java.util.Set;

import lombok.Data;

/**
 * The Class EmployeeDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Data
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

}
