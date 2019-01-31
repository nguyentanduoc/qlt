package com.vn.ctu.qlt.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.User;

@RestController
@RequestMapping("/api/admin/users")
public class UsersController {

	@PostMapping(path="/getAll")
	public ResponseEntity<List<User>> getAllUser(){
		return null;
	}
}
