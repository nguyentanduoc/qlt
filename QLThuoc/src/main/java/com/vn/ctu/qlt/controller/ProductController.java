package com.vn.ctu.qlt.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vn.ctu.qlt.dto.ProductDto;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.repository.ProductRepository;

@RestController
public class ProductController {

	@Autowired
	private ProductRepository productRepository;

	@PostMapping(path = "/api/product/save")
	public ResponseEntity<Product> save(@RequestParam("model") String model,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProductDto productDto = objectMapper.readValue(model, ProductDto.class);
			Product product = new Product();
			product.setProductName(productDto.getProductName());
			product.setImage(file.getBytes());
			productRepository.save(product);
			return ResponseEntity.ok().body(product);
		} catch (IOException e) {
			throw e;
		}
	}
}
