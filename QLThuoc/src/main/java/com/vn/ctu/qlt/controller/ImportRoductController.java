package com.vn.ctu.qlt.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.security.UserPrincipal;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.ImportRoductService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.UserSerivce;

/**
 * The Class ImportRoduct.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class ImportRoductController {

	/** The product service. */
	@Autowired
	private ProductService productService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private UserSerivce userSerivce;
	
	@Autowired
	private ImportRoductService importRoductService;
	
	/**
	 * Inits the.
	 *
	 * @return the response entity
	 */
	@PostMapping(path = "/api/import-product/init")
	public ResponseEntity<Map<String, Object>> init() {
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("products", productService.getAll());
		return ResponseEntity.ok().body(result);
	}
	
	@PostMapping(path = "/api/import-product/save")
	public ResponseEntity<Void> save(@RequestBody Set<ImportProductDto> importProductsDto) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		User user = userSerivce.findById(userPrincipal.getId()).get();
		Employee employee = employeeService.findEmployeeByUser(user).get();
		importRoductService.save(importProductsDto, employee);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
