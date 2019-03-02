package com.vn.ctu.qlt.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.vn.ctu.qlt.model.Employee;

public interface EmployeeRepository extends PagingAndSortingRepository<Employee, Long>{

}
