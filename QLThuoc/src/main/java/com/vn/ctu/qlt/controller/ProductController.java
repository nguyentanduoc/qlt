package com.vn.ctu.qlt.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class ProductController {

	@PostMapping(path="/api/product/save")
	public ResponseEntity<Void> save(@RequestParam("model") String model, 
			@RequestParam(value = "file", required = false) MultipartFile file){
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
