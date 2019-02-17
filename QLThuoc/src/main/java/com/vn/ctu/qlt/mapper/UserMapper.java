package com.vn.ctu.qlt.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.service.RoleService;

@Component
public class UserMapper implements RowMapper<User> {
	
	@Autowired
	private RoleService roleService;
	
	private final Logger logger = LoggerFactory.getLogger(getClass());
	
	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		try {
			List<Role> roles = roleService.getRoleByUserId(rs.getLong("id"));
			return new User(rs.getLong("id"), rs.getString("ten_dang_nhap"), rs.getString("email"),
					rs.getString("mat_khau"), rs.getBoolean("hoat_dong"), rs.getTimestamp("created_at").toInstant(),
					rs.getTimestamp("updated_at").toInstant(), roles);
		}
		catch (Exception e) {
			logger.error(String.format("Class Name %s error message %s", "UserMapper", e.getMessage()));
			throw e;
		}
	}

}
