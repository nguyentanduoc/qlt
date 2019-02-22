package com.vn.ctu.qlt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.service.BranchService;

@Controller
public class BranchController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private BranchService branchService;

	@PostMapping(path = "/api/branch/save")
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody Branch branch) {
		try {
			branchService.save(branch);
		} catch (DataIntegrityViolationException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}
	
	@GetMapping(path = "/api/branch/select")
	public ResponseEntity<Page<Branch>> select(@Param("condition") String condition, Pageable pageable){
		if( condition!=null ) {
			return ResponseEntity.ok().body(branchService.search(condition, pageable));
		} else {
			return ResponseEntity.ok().body(branchService.findAll(pageable));
		}
	}
	
	@PostMapping(path = "/api/branch/delete")
	public ResponseEntity<Void> delete(@RequestBody Long[] keys){
		branchService.deleteAll(keys);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
