package com.vn.ctu.qlt.service;

import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;

public interface ShopService {

	public Map<String, Object> save(ShopDto shop);
	
	public Page<Shop> select(String condition, Pageable page);
	
	public void delete(Long[] keys);
	
	public Iterable<Shop> selectAll();
	
	public Optional<Shop> findById(Long id);
	
	public Optional<Shop> findShopByDirector(Employee IdDirector);

}
