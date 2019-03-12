package com.vn.ctu.qlt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.service.ProductService;

@RestController
public class ImportRoduct {

	@Autowired
	private ProductService productService;
	
	@PostMapping(path = "/api/import-product/init")
	public ResponseEntity<Map<String, Object>> init() {
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("products", productService.getAll());
		return ResponseEntity.ok().body(result);
	}
}
