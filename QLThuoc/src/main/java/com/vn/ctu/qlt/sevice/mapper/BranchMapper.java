package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.repository.ShopRepository;

@Component
public class BranchMapper implements RowMapper<Branch> {

	@Autowired
	private ShopRepository shopRepository;
	
	@Override
	public Branch mapRow(ResultSet rs, int rowNum) throws SQLException {
		Optional<Shop> shop = shopRepository.findById(rs.getLong("cua_hang_id"));
		return Branch.builder()
				.withId(rs.getLong("id"))
				.withAddress(rs.getString("dia_chi"))
				.withIsEnabled(rs.getBoolean("hoat_dong"))
				.withLatitude(rs.getDouble("vi_do"))
				.withLongitude(rs.getDouble("kinh_do"))
				.withName(rs.getString("ten_chi_nhanh"))
				.withShop(shop.get())
				.build();
	}
}
