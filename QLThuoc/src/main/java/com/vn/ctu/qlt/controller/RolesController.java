package com.vn.ctu.qlt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.repository.RoleRepository;

@RestController
@RequestMapping("/api/admin/roles")
public class RolesController {

	@Autowired
	private RoleRepository roleRepo;
	
	@PostMapping(path="/getAll")
	public ResponseEntity<List<Role>> getAllUser() {
		return ResponseEntity.ok().body(roleRepo.findAll()); 
	}
	
	@PostMapping(path="/getRoleForAdmin")
	public ResponseEntity<List<Role>> getRoleForAdmin(){
		return ResponseEntity.ok().body(roleRepo.findByRoleNameForAdmin());
	}
}
