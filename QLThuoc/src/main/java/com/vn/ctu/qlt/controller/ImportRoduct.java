package com.vn.ctu.qlt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.service.ProductService;

/**
 * The Class ImportRoduct.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class ImportRoduct {

	/** The product service. */
	@Autowired
	private ProductService productService;
	
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
}
