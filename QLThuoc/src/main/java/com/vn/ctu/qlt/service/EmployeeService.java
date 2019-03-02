package com.vn.ctu.qlt.service;

import java.util.Optional;

import com.vn.ctu.qlt.model.Employee;

public interface EmployeeService {

	public Employee save(Employee employee);
	public Optional<Employee> findById(Long id);
}
