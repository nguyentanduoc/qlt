package com.vn.ctu.qlt.service;

import java.util.Optional;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;

public interface EmployeeService {

	public Employee save(Employee employee);
	
	public Employee save(EmployeeDto employee);
	
	public Optional<Employee> findById(Long id);
	
	public Optional<Employee> findEmployeeByUser(User user);
}
