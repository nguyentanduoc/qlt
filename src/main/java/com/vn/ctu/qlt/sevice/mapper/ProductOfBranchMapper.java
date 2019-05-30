package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.dao.ProductOfBranchDao;

@Component
public class ProductOfBranchMapper implements RowMapper<ProductOfBranchDao>{

	@Override
	public ProductOfBranchDao mapRow(ResultSet rs, int rowNum) throws SQLException {
		return ProductOfBranchDao.builder()
				.branchId(rs.getLong("ma_chi_nhanh"))
				.productId(rs.getLong("ma_san_pham"))
				.amount(rs.getDouble("so_luong"))
				.build();
	}

}
