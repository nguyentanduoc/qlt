package com.vn.ctu.qlt.dto;

import java.util.Set;

import com.vn.ctu.qlt.model.Role;

public class UpdateUserRoleDTO {

	private Long id;
	
	private Set<Role> roles;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	
}
