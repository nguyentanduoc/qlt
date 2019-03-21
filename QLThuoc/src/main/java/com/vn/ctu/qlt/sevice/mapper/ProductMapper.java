package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Producer;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.service.ProducerService;
import com.vn.ctu.qlt.service.UnitService;

@Component
public class ProductMapper implements RowMapper<Product> {

	@Autowired
	private ProducerService producerService;
	
	@Autowired
	private UnitService unitService;
	
	@Override
	public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
		Producer producer = producerService.getProducerById(rs.getLong("nha_san_xuat_id"));
		Unit unit = unitService.getUnitById(rs.getLong("don_vi_chuan"));
		Product product = new Product();
		product.setId(rs.getLong("id"));
		product.setProductName(rs.getString("ten_san_pham"));
		product.setVirtue(rs.getString("cong_dung"));
		product.setImage(rs.getString("hinh_anh"));
		product.setProducer(producer);
		product.setUnit(unit);
		return product;
	}

}
