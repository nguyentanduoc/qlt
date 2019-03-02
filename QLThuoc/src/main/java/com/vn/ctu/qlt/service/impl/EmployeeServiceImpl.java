package com.vn.ctu.qlt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.repository.EmployeeRepository;
import com.vn.ctu.qlt.service.EmployeeService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Override
	public Employee save(Employee employee) {
		employeeRepository.save(employee);
		return employee;
	}

}
