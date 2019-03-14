package com.vn.ctu.qlt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.payload.response.NavigrationResponse;
import com.vn.ctu.qlt.repository.NavigrationRepository;

@RestController
public class NavigrationController {

	@Autowired
	private NavigrationRepository navigrationRepository;

	@PostMapping(path = "/api/admin/nav/getAll")
	public ResponseEntity<List<NavigrationResponse>> getAllNav() {
		List<NavigrationResponse> navs = new ArrayList<NavigrationResponse>();
		List<Navigration> nav = navigrationRepository.findAllByTitleByOrderBySortNum(Sort.by("sortNum").ascending());
		for (Navigration n : nav) {
			NavigrationResponse navRes = new NavigrationResponse();
			BeanUtils.copyProperties(n, navRes);
			navs.add(navRes);
		}
		return ResponseEntity.ok().body(navs);
	}

	@PostMapping(path = "/api/admin/nav/getSubNav")
	public ResponseEntity<List<NavigrationResponse>> getSubNav(@RequestBody Long id) {
		Set<Navigration> navs = navigrationRepository.findAllByIdParent(id, Sort.by("sortNum").ascending());
		List<NavigrationResponse> navresponse = new ArrayList<NavigrationResponse>();
		for (Navigration n : navs) {
			NavigrationResponse navRes = new NavigrationResponse();
			BeanUtils.copyProperties(n, navRes);
			navresponse.add(navRes);
		}
		return ResponseEntity.ok().body(navresponse);
	}

	@PostMapping(path = "/api/admin/nav/updateNav")
	public ResponseEntity<Navigration> updateNav(@RequestBody Navigration nav) {
		try {
			navigrationRepository.save(nav);
			return ResponseEntity.ok().body(nav);
		} catch (Exception e) {
			throw e;
		}
	}
}
