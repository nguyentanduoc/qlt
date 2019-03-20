package com.vn.ctu.qlt.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.service.ShopService;

@RestController
@RequestMapping(path = "/api/shop")
public class ShopController {

	@Autowired
	private ShopService shopService;

	@PostMapping(path = "/save")
	public ResponseEntity<Map<String, Object>> save(@RequestBody ShopDto shop) {
		return ResponseEntity.ok().body(shopService.save(shop));
	}

	@GetMapping(path = "/select")
	public ResponseEntity<Page<ShopDto>> select(String condition, Pageable page) {
		return ResponseEntity.ok().body(shopService.selectDto(condition, page));
	}

	@PostMapping(path = "/delete")
	public ResponseEntity<Void> delete(@RequestBody Long[] keys) {
		shopService.delete(keys);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@GetMapping(path="/select-all")
	public  ResponseEntity<List<ShopDto>> selectAll() {
		return ResponseEntity.ok().body(shopService.selectAllDto());
	}
}
