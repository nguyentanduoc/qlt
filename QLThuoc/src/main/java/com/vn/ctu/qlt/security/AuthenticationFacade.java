package com.vn.ctu.qlt.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.UserSerivce;

@Component
public class AuthenticationFacade implements IAuthenticationFacade {

	@Autowired
	private UserSerivce userSerivce;
	
	@Autowired
	private EmployeeService employeeService;

	@Override
	public Authentication getAuthentication() {
		return SecurityContextHolder.getContext().getAuthentication();
	}

	@Override
	public Employee getEmployee() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		User user = userSerivce.findById(userPrincipal.getId()).get();
		Employee employee = employeeService.findEmployeeByUser(user).get();
		return employee;
	}

}
