package com.vn.ctu.qlt.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.UpdateUserRoleDto;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.service.UserService;

@RestController
@RequestMapping("/api/admin/users")
public class UsersController {

	@Autowired
	private UserService userSerivce;

	@Value("${app.passwordDefault}")
	private String passwordDefault;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@PostMapping(path = "/get-all")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok().body(userSerivce.findAll());
	}

	@PostMapping(path = "/update-role")
	public ResponseEntity<User> updateUser(@RequestBody UpdateUserRoleDto user) {
		Optional<User> userOptional = userSerivce.findById(user.getId());
		if(!userOptional.isPresent()) throw new UsernameNotFoundException(String.format("Tài khoản %s không tồn tại", user.getId()));
		User userModel = userOptional.get();
		userModel.setRoles(user.getRoles());
		userSerivce.save(userModel);
		return ResponseEntity.ok().body(userModel);
	}

	@PostMapping(path = "/search")
	public ResponseEntity<PageImpl<User>> search(@RequestBody String condition) {
		try {
			return ResponseEntity.ok().body(userSerivce.searchUser(condition, PageRequest.of(0, 3)));
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	@PostMapping(path = "/create")
	public ResponseEntity<User> create(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(passwordDefault));
		userSerivce.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(user);
	}

	@GetMapping(path = "/get-user-limit")
	public ResponseEntity<Page<User>> getUserLimit(Pageable pageable) {
		return ResponseEntity.ok().body(userSerivce.getAllUser(pageable));
	}
	
	@PostMapping(path = "/delete")
	public ResponseEntity delete(@RequestBody Long[] ids){
		userSerivce.delete(ids);
		return new ResponseEntity(HttpStatus.OK);
	}
}
