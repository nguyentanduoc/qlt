package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;

public interface RoleService {

	public List<Role> getRoleByUserId(Long id); 
	
	public List<Role> getAll();
	
	public List<Role> findByRoleNameForAdmin();
	
	public Set<Role> getRolesByRoles(List<Role> roles);
	
	public Optional<Role> findRoleByRoleName(RoleName roleName);
}
