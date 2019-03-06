package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.vn.ctu.qlt.dto.RoleSeletionDto;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;

/**
 * The Interface RoleService.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
public interface RoleService {

	/**
	 * Gets the role by user id.
	 *
	 * @param id the id
	 * @return the role by user id
	 */
	public Set<Role> getRoleByUserId(Long id); 
	
	/**
	 * Gets the all.
	 *
	 * @return the all
	 */
	public List<Role> getAll();
	
	/**
	 * Gets the by role name for admin.
	 *
	 * @return the by role name for admin
	 */
	public List<Role> getByRoleNameForAdmin();
	
	/**
	 * Gets the roles by roles.
	 *
	 * @param roles the roles
	 * @return the roles by roles
	 */
	public Set<Role> getRolesByRoles(List<Role> roles);
	
	/**
	 * Gets the role by role name.
	 *
	 * @param roleName the role name
	 * @return the role by role name
	 */
	public Optional<Role> getRoleByRoleName(RoleName roleName);
	
	/**
	 * Gets the role for director.
	 *
	 * @return the role for director
	 */
	public List<Role> getRoleForDirector();
	
	/**
	 * Gets the roles by role seletion.
	 *
	 * @param roles the roles
	 * @return the roles by role seletion
	 */
	public Set<Role> getRolesByRoleSeletion(Set<RoleSeletionDto> roles);
}
