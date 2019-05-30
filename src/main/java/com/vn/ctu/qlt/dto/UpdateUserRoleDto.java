package com.vn.ctu.qlt.dto;

import java.util.Set;

import com.vn.ctu.qlt.model.Role;

import lombok.Data;

@Data
public class UpdateUserRoleDto {

	private Long id;

	private Set<Role> roles;

}
