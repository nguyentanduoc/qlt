package com.vn.ctu.qlt.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.QueryBranchDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.service.BranchService;

@Controller
public class BranchController {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private BranchService branchService;

	@PostMapping(path = "/api/branch/save")
	@ResponseStatus(HttpStatus.CREATED)
	public void save(@RequestBody BranchDto branch) {
		try {
			branchService.save(branch);
		} catch (DataIntegrityViolationException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	@PostMapping(path = "/api/branch/select")
	public ResponseEntity<Page<Branch>> select(@RequestBody QueryBranchDto query) {

		try {
			PageRequest pageRequest = PageRequest.of(query.getPageable().getPage(), query.getPageable().getSize());
			return ResponseEntity.ok().body(branchService.getBranhByDirector(query.getIdDirector(), pageRequest));
		} catch (Exception e) {
			throw e;
		}
	}

	@PostMapping(path = "/api/branch/delete")
	public ResponseEntity<Void> delete(@RequestBody Long[] keys) {
		branchService.deleteAll(keys);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
