package com.vn.ctu.qlt.payload.response;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.User;

import lombok.Data;

@Data
public class LoginSuccess {

	private JwtAuthenticationResponse jwtAuthenticationResponse;

	private User user;

	private List<Navigration> nav;

	private Set<String> authorities;
	
	private List<BranchDto> branchs;

	public LoginSuccess(JwtAuthenticationResponse jwtAuthenticationResponse, User user, List<Navigration> nav,
			Set<String> authorities, List<BranchDto> branchs) {
		super();
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
		this.user = user;
		this.nav = nav;
		this.authorities = authorities;
		this.branchs = branchs;
	}

}
