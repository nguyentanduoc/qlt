package com.vn.ctu.qlt.security;

import com.vn.ctu.qlt.model.User;
import org.springframework.security.core.Authentication;

import com.vn.ctu.qlt.model.Employee;

public interface IAuthenticationFacade {

	public Authentication getAuthentication();

	public Employee getEmployee();

	public User getUser();
}
