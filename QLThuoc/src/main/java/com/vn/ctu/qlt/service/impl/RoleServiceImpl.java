package com.vn.ctu.qlt.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.mapper.RoleMapper;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<Role> getRoleByUserId(Long id) {
		try {
			StringBuilder sql = new StringBuilder("Select q.id, q.ten_quyen, q.mo_ta, q.cap_do ");
			sql.append("from quyen q inner join quyen_tai_khoan qtk on q.id = qtk.quyen_id ");
			sql.append("where qtk.tai_khoan_id = ?");
			return jdbcTemplate.query(sql.toString(), new Object[] { id }, new RoleMapper());
		} catch (Exception e) {
			throw e;
		}
	}

}
