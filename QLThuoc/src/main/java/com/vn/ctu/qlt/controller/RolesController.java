package com.vn.ctu.qlt.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.service.RoleService;

/**
 * The Class RolesController.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@RestController
@RequestMapping("/api/admin/roles")
public class RolesController {

	/** The role service. */
	@Autowired
	private RoleService roleService;

	/**
	 * Gets the all user.
	 *
	 * @return the all user
	 */
	@PostMapping(path = "/get-all")
	public ResponseEntity<List<Role>> getAllUser() {
		return ResponseEntity.ok().body(roleService.getAll());
	}

	/**
	 * Gets the role for admin.
	 *
	 * @return the role for admin
	 */
	@PostMapping(path = "/get-role-for-admin")
	public ResponseEntity<List<Role>> getRoleForAdmin() {
		return ResponseEntity.ok().body(roleService.getByRoleNameForAdmin());
	}

	/**
	 * Gets the roles by roles.
	 *
	 * @param roles the roles
	 * @return the roles by roles
	 */
	@PostMapping(path = "/get-roles-by-roles")
	public ResponseEntity<Set<Role>> getRolesByRoles(@RequestBody List<Role> roles) {
		return ResponseEntity.ok().body(roleService.getRolesByRoles(roles));
	}
}
