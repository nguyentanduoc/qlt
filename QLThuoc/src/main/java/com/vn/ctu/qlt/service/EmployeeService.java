package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;

import java.util.Optional;
import java.util.Set;

public interface EmployeeService {

	Employee save(Employee employee);
	
	Employee save(EmployeeDto employee);
	
	Optional<Employee> findById(Long id);
	
	Optional<Employee> findEmployeeByUser(User user);

	Set<EmployeeDto> getAllEmployeeByDirector();

	void deleteEmployee(Long id);
}
