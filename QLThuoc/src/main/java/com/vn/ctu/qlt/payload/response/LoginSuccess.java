package com.vn.ctu.qlt.payload.response;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.User;

public class LoginSuccess {

	private JwtAuthenticationResponse jwtAuthenticationResponse;

	private User user;

	private Navigration[] nav;

	private Set<String> authorities;

	public LoginSuccess(JwtAuthenticationResponse jwtAuthenticationResponse, User user, List<Navigration> nav,
			Set<String> authorities) {
		super();
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
		this.user = user;
		this.nav = new Navigration[nav.size()];
		this.nav = nav.toArray(this.nav);
		this.authorities = authorities;
	}

	public JwtAuthenticationResponse getJwtAuthenticationResponse() {
		return jwtAuthenticationResponse;
	}

	public void setJwtAuthenticationResponse(JwtAuthenticationResponse jwtAuthenticationResponse) {
		this.jwtAuthenticationResponse = jwtAuthenticationResponse;
	}

	public Navigration[] getNav() {
		return nav;
	}

	public void setNav(Navigration[] nav) {
		this.nav = nav;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<String> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<String> authorities) {
		this.authorities = authorities;
	}

}
