package com.vn.ctu.qlt.app.controller;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.app.exception.ResourceNotFoundException;
import com.vn.ctu.qlt.app.model.User;
import com.vn.ctu.qlt.app.payload.SignUpRequest;
import com.vn.ctu.qlt.app.repository.UserRepository;
import com.vn.ctu.qlt.app.security.CurrentUser;
import com.vn.ctu.qlt.app.security.UserPrincipal;

@RestController
public class AuthController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
		return userRepository.findById(userPrincipal.getId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
	}

	@PostMapping(path = "/auth/signup")
	@PermitAll
	public ResponseEntity<SignUpRequest> createUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		logger.debug(signUpRequest.toString());
		return ResponseEntity.ok().body(signUpRequest);
	}
}
