package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.BranchesSelectionDto;
import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.dto.RoleSeletionDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.*;

/**
 * The Class EmployeeController.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Controller
@RequestMapping(path = "/api/employee")
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
	 * @param employeeDto the employee
	 * @return the response entity
	 */
	@PostMapping(path = "/save")
	public ResponseEntity<EmployeeDto> save(@RequestBody EmployeeDto employeeDto) {
		logger.debug("save employee");
		Employee employee = employeeService.save(employeeDto);
		EmployeeDto employeeDto1 = new EmployeeDto();
		BeanUtils.copyProperties(employee, employeeDto1);
		Set<RoleSeletionDto> rolesSelectionDto = roleService.convertRolesToRolesDto(employee.getUser().getRoles());
		Set<Branch> branches = employee.getBranchs();
		Set<BranchesSelectionDto> branchesSelectionDto = branchService.covertBranchedToBranchesSelection(branches);
		employeeDto1.setRoles(rolesSelectionDto);
		employeeDto1.setBranches(branchesSelectionDto);
		employeeDto1.setUsername(employee.getUser().getUsername());
		return ResponseEntity.ok().body(employeeDto1);
	}

	/**
	 * Inits the.
	 *
	 * @param idDirector the id director
	 * @return the response entity
	 */
	@PostMapping(path = "/init")
	public ResponseEntity<Map<String, Object>> init(@RequestBody Long idDirector) {
		try {
			Set<Branch> branches = branchService.selectBranchByDirector(idDirector);
			List<Role> roles = roleService.getRoleForDirector();
			List<BranchesSelectionDto> branchesDto = new ArrayList<>();
			List<RoleSeletionDto> rolesSelectionDto = new ArrayList<>();
			branches.forEach(branch -> {
				BranchesSelectionDto branchesSelectionDto = new BranchesSelectionDto();
				branchesSelectionDto.setLabel(branch.getName());
				branchesSelectionDto.setValue(branch.getId());
				branchesDto.add(branchesSelectionDto);
			});
			roles.forEach(role -> {
				RoleSeletionDto roleSeletionDto = new RoleSeletionDto();
				roleSeletionDto.setLabel(role.getDetail());
				roleSeletionDto.setValue(role.getId());
				rolesSelectionDto.add(roleSeletionDto);
			});
			Map<String, Object> result = new HashMap<>();
			result.put("roles", rolesSelectionDto);
			result.put("branches", branchesDto);
			result.put("employees", employeeService.getAllEmployeeByDirector());
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}
	@PostMapping(path = "/delete")
	public ResponseEntity deleteEmployee(@RequestBody Long id){
		employeeService.deleteEmployee(id);
		return new ResponseEntity(HttpStatus.OK);
	}
}
