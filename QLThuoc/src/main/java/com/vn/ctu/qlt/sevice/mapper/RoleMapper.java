package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;

public class RoleMapper implements RowMapper<Role> {

	@Override
	public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
		return Role.builder()
				.withId(rs.getLong("ma"))
				.withName(RoleName.valueOf(rs.getString("ten_quyen")))
				.withDetail(rs.getString("mo_ta"))
				.withLevel(rs.getInt("cap_do")).build();
	}

}
