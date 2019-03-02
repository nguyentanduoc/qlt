package com.vn.ctu.qlt.controller;

import java.net.URI;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vn.ctu.qlt.exception.AppException;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.payload.ApiResponse;
import com.vn.ctu.qlt.payload.LoginRequest;
import com.vn.ctu.qlt.payload.SignUpRequest;
import com.vn.ctu.qlt.payload.response.JwtAuthenticationResponse;
import com.vn.ctu.qlt.payload.response.LoginSuccess;
import com.vn.ctu.qlt.repository.RoleRepository;
import com.vn.ctu.qlt.repository.UserRepository;
import com.vn.ctu.qlt.security.JwtTokenProvider;
import com.vn.ctu.qlt.security.UserPrincipal;
import com.vn.ctu.qlt.service.NavService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
	private NavService roleService;

	@PostMapping("/signin")
	public ResponseEntity<LoginSuccess> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		logger.debug("AuthController do signin");
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			List<Navigration> navs = roleService.getNavListRoleName(authentication.getAuthorities());
			String jwt = tokenProvider.generateToken(authentication);
			UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
			Optional<User> user = userRepository.findById(userPrincipal.getId());
			Set<String> authorities = new HashSet<String>();
			for(Role role : user.get().getRoles()) {
				authorities.add(role.getName().toString());
			}
			LoginSuccess loginSuccess = new LoginSuccess(new JwtAuthenticationResponse(jwt), user.get(), navs, authorities);
			return ResponseEntity.ok(loginSuccess);
		} catch (BadCredentialsException e) {
			throw e;
		}
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<Object>(new ApiResponse(false, "Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<Object>(new ApiResponse(false, "Email Address already in use!"),
					HttpStatus.BAD_REQUEST);
		}
		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
				signUpRequest.getPassword());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
				.orElseThrow(() -> new AppException("User Role not set."));
		user.setRoles(Collections.singleton(userRole));
		User result = userRepository.save(user);
		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
				.buildAndExpand(result.getUsername()).toUri();
		return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
	}
}
