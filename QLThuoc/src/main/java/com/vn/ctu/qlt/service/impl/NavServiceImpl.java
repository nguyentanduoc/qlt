package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.service.NavService;
import com.vn.ctu.qlt.sevice.mapper.NavigrationMapper;

@Service
public class NavServiceImpl implements NavService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private NavigrationMapper navigrationMapper;

	@Override
	public List<Navigration> getNavListRoleName(Collection<? extends GrantedAuthority> roleNames) {
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append(
				"select nav.id, nav.name, nav.url, nav.icon,nav.title,nav.has_children, nav.is_children, nav.badge_id, nav.variant, nav.\"text\" from (\r\n"
						+ "	select distinct ON (navigration.id) navigration.id, navigration.\"name\", navigration.url, navigration.icon, navigration.title, navigration.sort_num, navigration.has_children, navigration.is_children, badges.id as badge_id, badges.\"text\", badges.variant from navigration\r\n"
						+ "	inner join navigration_roles navr on navigration.id = navr.navigration_id\r\n"
						+ "	left join quyen on navr.role_id = quyen.id\r\n"
						+ "	left join badges on badges.id = navigration.badge_id\r\n")
				.append(" where navigration.is_children = false and (");
		List<String> roleArgs = new ArrayList<>();
		int i = 0;
		for (GrantedAuthority role : roleNames) {
			roleArgs.add(role.getAuthority());
			sqlBuilder.append("quyen.ten_quyen = ? ");
			if (roleNames.size() - 1 != i)
				sqlBuilder.append("or").append(" ");
			i++;
		}
		sqlBuilder.append(" )) nav order by nav.sort_num ASC");
		// jdbcTemplate.query(sqlBuilder.toString(), new
		// BeanPropertyRowMapper<Navigration>(Navigration.class));

		return jdbcTemplate.query(sqlBuilder.toString(), roleArgs.toArray(), navigrationMapper);
	}

}
