package com.vn.ctu.qlt.payload.response;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.vn.ctu.qlt.model.Navigration;

public class LoginSuccess {

	private JwtAuthenticationResponse jwtAuthenticationResponse;

	private Authentication authentication;

	private Navigration[] nav;

	public LoginSuccess(JwtAuthenticationResponse jwtAuthenticationResponse, Authentication authentication,
			List<Navigration> nav) {
		super();
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
		this.authentication = authentication;
		this.nav = new Navigration[nav.size()];
		this.nav = nav.toArray(this.nav);
	}

	public JwtAuthenticationResponse getJwtAuthenticationResponse() {
		return jwtAuthenticationResponse;
	}

	public void setJwtAuthenticationResponse(JwtAuthenticationResponse jwtAuthenticationResponse) {
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
	}

	public Authentication getAuthentication() {
		return authentication;
	}

	public void setAuthentication(Authentication authentication) {
		this.authentication = authentication;
	}

	public Navigration[] getNav() {
		return nav;
	}

	public void setNav(Navigration[] nav) {
		this.nav = nav;
	}
}
