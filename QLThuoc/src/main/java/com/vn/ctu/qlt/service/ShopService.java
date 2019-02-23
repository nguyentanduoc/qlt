package com.vn.ctu.qlt.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.model.Shop;

public interface ShopService {

	public void save(Shop shop);
	
	public Page<Shop> select(String condition, Pageable page);
	
	public void delete(Long[] keys);

}
