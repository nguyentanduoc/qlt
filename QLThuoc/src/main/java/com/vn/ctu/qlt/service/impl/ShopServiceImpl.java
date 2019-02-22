package com.vn.ctu.qlt.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.repository.ShopRepository;
import com.vn.ctu.qlt.service.ShopService;

@Service
public class ShopServiceImpl implements ShopService {

	@Autowired
	private ShopRepository shopRepository;
	
	@Override
	public void save(Shop shop) {
		shopRepository.save(shop);
	}

}
