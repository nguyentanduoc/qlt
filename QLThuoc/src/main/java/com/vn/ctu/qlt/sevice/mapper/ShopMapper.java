package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Shop;

@Component
public class ShopMapper implements RowMapper<Shop> {

	@Override
	public Shop mapRow(ResultSet rs, int rowNum) throws SQLException {
		return Shop.builder()
				.withId(rs.getLong("ma"))
				.withNameShop(rs.getString("ten_cua_hang"))
				.withIsEnabled(rs.getBoolean("hoat_dong"))
				.withEstablishAt(rs.getTimestamp("ngay_thanh_lap"))
				.withCreateAt(rs.getTimestamp("ngay_tao"))
				.withUpdateAt(rs.getTimestamp("ngay_cap_nhat"))
				.build();
	}
}
