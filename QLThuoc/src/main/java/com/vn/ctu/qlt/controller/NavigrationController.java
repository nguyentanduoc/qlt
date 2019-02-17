package com.vn.ctu.qlt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.repository.NavigrationRepository;

@RestController
public class NavigrationController {

	@Autowired
	private NavigrationRepository navigrationRepo;

	@PostMapping(path = "/api/admin/nav/getAll")
	public ResponseEntity<List<Navigration>> getAllNav() {
		return ResponseEntity.ok().body(navigrationRepo.findAllByTitleByOrderBySortNum(Sort.by("sortNum").ascending()));
	}

	@PostMapping(path = "/api/admin/nav/getSubNav")
	public ResponseEntity<List<Navigration>> getSubNav(@RequestBody Integer sortNum) {
		return ResponseEntity.ok().body(navigrationRepo.getSubNav(sortNum, sortNum + 100, Sort.by("sortNum").ascending()));
	}
	
	@PostMapping(path = "/api/admin/nav/updateNav")
	public ResponseEntity<Navigration> updateNav(@RequestBody Navigration nav) {
		try {
			navigrationRepo.save(nav);
			return ResponseEntity.ok().body(nav);
		}catch (Exception e) {
			throw e;
		}
	}
}
