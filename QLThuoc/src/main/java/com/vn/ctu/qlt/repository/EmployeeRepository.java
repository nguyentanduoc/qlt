package com.vn.ctu.qlt.repository;

import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long> {
	
	public Optional<Employee> findByUser(User user);

}
