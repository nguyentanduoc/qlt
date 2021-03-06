package com.vn.ctu.qlt.payload.response;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.UserDto;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.User;

import lombok.Data;

@Data
public class LoginSuccess {

	private JwtAuthenticationResponse jwtAuthenticationResponse;

	private UserDto user;

	private List<Navigration> nav;

	private Set<String> authorities;
	
	private List<BranchDto> branches;

	public LoginSuccess(JwtAuthenticationResponse jwtAuthenticationResponse, UserDto user, List<Navigration> nav,
			Set<String> authorities, List<BranchDto> branches) {
		super();
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
		this.user = user;
		this.nav = nav;
		this.authorities = authorities;
		this.branches = branches;
	}

}
