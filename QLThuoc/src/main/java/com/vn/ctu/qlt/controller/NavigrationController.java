package com.vn.ctu.qlt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.NavigrationDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.repository.NavigrationRepository;

@RestController
public class NavigrationController {

	@Autowired
	private NavigrationRepository navigrationRepository;

	@PostMapping(path = "/api/admin/nav/get-all")
	public ResponseEntity<List<NavigrationDto>> getAllNav() {
		List<NavigrationDto> navs = new ArrayList<NavigrationDto>();
		List<Navigration> nav = navigrationRepository.findAllByTitleByOrderBySortNum(Sort.by("sortNum").ascending());
		for (Navigration n : nav) {
			NavigrationDto navRes = new NavigrationDto();
			BeanUtils.copyProperties(n, navRes);
			navs.add(navRes);
		}
		return ResponseEntity.ok().body(navs);
	}

	@PostMapping(path = "/api/admin/nav/get-sub-nav")
	public ResponseEntity<List<NavigrationDto>> getSubNav(@RequestBody Long id) {
		Set<Navigration> navs = navigrationRepository.findAllByIdParent(id, Sort.by("sortNum").ascending());
		List<NavigrationDto> navresponse = new ArrayList<NavigrationDto>();
		for (Navigration n : navs) {
			NavigrationDto navRes = new NavigrationDto();
			BeanUtils.copyProperties(n, navRes);
			navresponse.add(navRes);
		}
		return ResponseEntity.ok().body(navresponse);
	}

	@PostMapping(path = "/api/admin/nav/update-nav")
	public ResponseEntity<Navigration> updateNav(@RequestBody NavigrationDto nav) {
		try {
			Optional<Navigration> navOptional = navigrationRepository.findById(nav.getId());
			if(navOptional.isPresent()) {
				Navigration navModal = navOptional.get();
				navModal.setRoles(nav.getRoles());
				navigrationRepository.save(navModal);
				return ResponseEntity.ok().body(navModal);
			} else {
				throw new BadRequestException("Danh mục không tồn tại");
			}
		} catch (Exception e) {
			throw e;
		}
	}
}
