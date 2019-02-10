package com.vn.ctu.qlt.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.UpdateUserRoleDTO;
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
	
	@PostMapping(path="/updateRole")
	public ResponseEntity<User> updateUser(@RequestBody UpdateUserRoleDTO user) {
		Optional<User> userOptional = userRepo.findById(user.getId());
		if(userOptional.get()!=null) {
			User userModel = userOptional.get();
			userModel.setRoles(user.getRoles());
			userRepo.save(userModel);
			return ResponseEntity.ok().body(userModel);
		} else {
			throw new UsernameNotFoundException(String.format("Tài khoản %s không tồn tại", user.getId()));
		}
	}
}
