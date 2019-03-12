package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ProductSelectionDto;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.repository.ProductRepository;
import com.vn.ctu.qlt.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Override
	public List<ProductSelectionDto> getAll() {
		List<Product> products = productRepository.findAll();
		List<ProductSelectionDto> result = new ArrayList<ProductSelectionDto>();
		
		for(Product product : products) {
			result.add(new ProductSelectionDto(product.getId(), product.getProductName()));
		}
		return result;
	}

}
