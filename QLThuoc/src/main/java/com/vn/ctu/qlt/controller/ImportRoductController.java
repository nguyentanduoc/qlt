package com.vn.ctu.qlt.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.service.ImportRoductService;
import com.vn.ctu.qlt.service.ProductService;

/**
 * The Class ImportRoduct.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class ImportRoductController {

	/** The product service. */
	@Autowired
	private ProductService productService;
	
	@Autowired
	private ImportRoductService importRoductService;
	
	/**
	 * Inits the.
	 *
	 * @return the response entity
	 */
	@PostMapping(path = "/api/import-product/init")
	public ResponseEntity<Map<String, Object>> init() {
		Map<String, Object> result = new HashMap<String,Object>();
		result.put("products", productService.getAllForSeletionWithProducer());
		return ResponseEntity.ok().body(result);
	}
	
	@PostMapping(path = "/api/import-product/save")
	public ResponseEntity<Void> save(@RequestBody ImportProductDto importProductDto) {
		importRoductService.save(importProductDto);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
