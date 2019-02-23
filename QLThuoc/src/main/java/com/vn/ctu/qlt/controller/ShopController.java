package com.vn.ctu.qlt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.service.ShopService;

@RestController
@RequestMapping(path = "/api/shop")
public class ShopController {

	@Autowired
	private ShopService shopService;

	@PostMapping(path = "/save")
	public ResponseEntity<Shop> save(@RequestBody Shop shop) {
		shopService.save(shop);
		return ResponseEntity.ok().body(shop);
	}

	@GetMapping(path = "/select")
	public ResponseEntity<Page<Shop>> select(String condition, Pageable page) {
		return ResponseEntity.ok().body(shopService.select(condition, page));
	}
}
