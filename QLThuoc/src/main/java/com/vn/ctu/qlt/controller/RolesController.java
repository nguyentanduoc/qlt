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

@RestController
@RequestMapping("/api/admin/roles")
public class RolesController {

	@Autowired
	private RoleService roleService;

	@PostMapping(path = "/getAll")
	public ResponseEntity<List<Role>> getAllUser() {
		return ResponseEntity.ok().body(roleService.getAll());
	}

	@PostMapping(path = "/getRoleForAdmin")
	public ResponseEntity<List<Role>> getRoleForAdmin() {
		return ResponseEntity.ok().body(roleService.findByRoleNameForAdmin());
	}

	@PostMapping(path = "/getRolesByRoles")
	public ResponseEntity<Set<Role>> getRolesByRoles(@RequestBody List<Role> roles) {
		return ResponseEntity.ok().body(roleService.getRolesByRoles(roles));
	}
}
