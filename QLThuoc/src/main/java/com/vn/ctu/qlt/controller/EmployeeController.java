package com.vn.ctu.qlt.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.vn.ctu.qlt.dto.EmployeeDto;

@Controller
public class EmployeeController {
	

	@PostMapping(path = "/api/employee/save")
	public ResponseEntity<Void> save(@RequestBody EmployeeDto employee) {
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
