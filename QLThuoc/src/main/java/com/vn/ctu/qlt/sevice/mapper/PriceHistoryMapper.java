package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.dao.PriceHistoryDao;

@Component
public class PriceHistoryMapper implements RowMapper<PriceHistoryDao> {

	@Override
	public PriceHistoryDao mapRow(ResultSet rs, int rowNum) throws SQLException {
		return PriceHistoryDao.builder()
				.branchId(rs.getLong("chi_nhanh_id"))
				.productId(rs.getLong("san_pham_id"))
				.date(rs.getDate("ngay_thay_doi"))
				.price(rs.getDouble("don_gia"))
				.build();
	}

}
