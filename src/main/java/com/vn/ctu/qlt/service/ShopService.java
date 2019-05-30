package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;

public interface ShopService {

	Map<String, Object> save(ShopDto shop);
	
	Page<Shop> select(String condition, Pageable page);
	
	Page<ShopDto> selectDto(String condition, Pageable page);
	
	void delete(Long[] keys);
	
	Iterable<Shop> selectAll();
	
	List<ShopDto> selectAllDto();
	
	Optional<Shop> findById(Long id);
	
	Optional<Shop> findShopByDirector(Employee employee);

	ShopDto save(Shop shop);

	Map<String, Object> getReport();
}
