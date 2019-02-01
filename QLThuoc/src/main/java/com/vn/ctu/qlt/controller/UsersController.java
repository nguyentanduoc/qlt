package com.vn.ctu.qlt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.UserRepository;

@RestController
@RequestMapping("/api/admin/users")
public class UsersController {

	@Autowired
	private UserRepository userRepo;
	
	@PostMapping(path="/getAll")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok().body(userRepo.findAll()); 
	}
}
