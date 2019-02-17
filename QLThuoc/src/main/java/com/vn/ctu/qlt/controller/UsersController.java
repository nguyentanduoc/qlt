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

import com.vn.ctu.qlt.dto.UpdateUserRoleDTO;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.service.UserSerivce;

@RestController
@RequestMapping("/api/admin/users")
public class UsersController {

	@Autowired
	private UserSerivce userSerive;

	@Value("${app.passworDefault}")
	private String passwordDefault;

	@Autowired
	private PasswordEncoder passwordEncoder;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@PostMapping(path = "/getAll")
	public ResponseEntity<List<User>> getAllUser() {
		return ResponseEntity.ok().body(userSerive.findAll());
	}

	@PostMapping(path = "/updateRole")
	public ResponseEntity<User> updateUser(@RequestBody UpdateUserRoleDTO user) {
		Optional<User> userOptional = userSerive.findById(user.getId());
		if (userOptional.get() != null) {
			User userModel = userOptional.get();
			userModel.setRoles(user.getRoles());
			userSerive.save(userModel);
			return ResponseEntity.ok().body(userModel);
		} else {
			logger.error(String.format("Tài khoản %s không tồn tại", user.getId()));
			throw new UsernameNotFoundException(String.format("Tài khoản %s không tồn tại", user.getId()));
		}
	}

	@PostMapping(path = "/search")
	public ResponseEntity<PageImpl<User>> search(@RequestBody String condition) {
		try {
			return ResponseEntity.ok().body(userSerive.searchUser(condition, PageRequest.of(0, 3)));
		} catch (Exception e) {
			throw e;
		}
	}

	@PostMapping(path = "/create")
	public ResponseEntity<User> create(@RequestBody User user) {
		user.setPassword(passwordEncoder.encode(passwordDefault));
		userSerive.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(user);
	}

	@GetMapping(path = "/getUserLimit")
	public ResponseEntity<Page<User>> getUserLimit(Pageable pageable) {
		return ResponseEntity.ok().body(userSerive.getAllUser(pageable));
	}
}
