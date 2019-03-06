package com.vn.ctu.qlt.service.impl;

import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.EmployeeRepository;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.RoleService;
import com.vn.ctu.qlt.service.UserSerivce;

/**
 * The Class EmployeeServiceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

	/** The employee repository. */
	@Autowired
	private EmployeeRepository employeeRepository;
	
	/** The branch service. */
	@Autowired
	private BranchService branchService;
	
	/** The role serice. */
	@Autowired 
	private RoleService roleSerice;
	
	/** The password default. */
	@Value("${app.passworDefault}")
	private String passwordDefault;
	
	/** The password encoder. */
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	/** The user service. */
	@Autowired
	private UserSerivce userService;
	
	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.EmployeeService#save(com.vn.ctu.qlt.model.Employee)
	 */
	@Override
	public Employee save(Employee employee) {
		employeeRepository.save(employee);
		return employee;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.EmployeeService#findById(java.lang.Long)
	 */
	@Override
	public Optional<Employee> findById(Long id) {
		return employeeRepository.findById(id);
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.EmployeeService#findEmployeeByUser(com.vn.ctu.qlt.model.User)
	 */
	@Override
	public Optional<Employee> findEmployeeByUser(User user) {
		return employeeRepository.findByUser(user);
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.EmployeeService#save(com.vn.ctu.qlt.dto.EmployeeDto)
	 */
	@Override
	@Transactional
	public Employee save(EmployeeDto employeeDto) {
		Set<Branch> branchs = branchService.findByList(employeeDto.getBranchs());
		Set<Role> roles = roleSerice.getRolesByRoleSeletion(employeeDto.getRoles());
		
		//create account
		User user = new User();
		user.setUsername(employeeDto.getUsername());
		user.setPassword(passwordEncoder.encode(passwordDefault));
		user.setRoles(roles);
		user.setIsEnabled(true);
		userService.save(user);
		
		//create employee
		Employee employee = new Employee();
		employee.setUser(user);
		employee.setBranchs(branchs);
		employee.setNameEmployee(employeeDto.getNameEmployee());
		employeeRepository.save(employee);
		
		return employee;
	}

}
