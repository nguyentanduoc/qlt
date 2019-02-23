package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Branch;

@Component
public class BranchMapper implements RowMapper<Branch> {

	@Override
	public Branch mapRow(ResultSet rs, int rowNum) throws SQLException {
		return Branch.builder().withId(rs.getLong("id")).withAddress(rs.getString("dia_chi"))
				.withIsEnabled(rs.getBoolean("hoat_dong")).withLatitude(rs.getDouble("vi_do"))
				.withLongitude(rs.getDouble("kinh_do")).withName(rs.getString("ten_chi_nhanh")).build();
	}
}
