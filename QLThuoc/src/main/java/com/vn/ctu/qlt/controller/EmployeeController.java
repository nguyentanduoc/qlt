package com.vn.ctu.qlt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.RoleService;

/**
 * The Class EmployeeController.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Controller
public class EmployeeController {

	/** The logger. */
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	/** The branch service. */
	@Autowired
	private BranchService branchService;

	/** The role service. */
	@Autowired
	private RoleService roleService;

	/** The employee service. */
	@Autowired
	private EmployeeService employeeService;

	/**
	 * Save.
	 *
	 * @param employee the employee
	 * @return the response entity
	 */
	@PostMapping(path = "/api/employee/save")
	public ResponseEntity<Void> save(@RequestBody EmployeeDto employee) {
		employeeService.save(employee);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	/**
	 * Inits the.
	 *
	 * @param idDirector the id director
	 * @return the response entity
	 */
	@PostMapping(path = "/api/employee/init")
	public ResponseEntity<Map<String, Object>> init(@RequestBody Long idDirector) {
		try {
			Set<Branch> branchs = branchService.selectBranchByDirector(idDirector);
			List<Role> roles = roleService.getRoleForDirector();
			Map<String, Object> result = new HashMap<>();
			result.put("roles", roles);
			result.put("branchs", branchs);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
		
	}
}
