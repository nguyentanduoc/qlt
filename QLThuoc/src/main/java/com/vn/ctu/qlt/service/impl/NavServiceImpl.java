package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Badge;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.service.NavService;

@Service
public class NavServiceImpl implements NavService {

	@Autowired
	private DataSource dataSource;
	private JdbcTemplate jdbcTemplate;

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<Navigration> getNavListRoleName(Collection<? extends GrantedAuthority> roleNames) {
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append("select DISTINCT ON (navigration.id) navigration.id, navigration.\"name\", navigration.url, navigration.icon, navigration.title, navigration.sort_num, badges.id as badge_id, badges.\"text\", badges.variant from navigration \r\n" + 
				"left join navigration_roles navr on navigration.id = navr.navigration_id\r\n" + 
				"right join quyen on navr.role_id = quyen.id\r\n" + 
				"left join badges on badges.id = navigration.badge_id").append(" where ");
		int count =  roleNames.size();
		int i = 0;
		for (GrantedAuthority role : roleNames) {
			sqlBuilder.append("quyen.ten_quyen = '").append(role.getAuthority()).append("' ");
			if(count - 1 != i) sqlBuilder.append("or").append(" ");
			i++;
		}
//		sqlBuilder.append("order by navigration.sort_num ASC");
		List<Navigration> navs = new ArrayList<>();//jdbcTemplate.query(sqlBuilder.toString(), new BeanPropertyRowMapper<Navigration>(Navigration.class));
		List<Map<String, Object>> rows = jdbcTemplate.queryForList(sqlBuilder.toString());
		for (Map<String, Object> row : rows) {
			Badge badge = new Badge();
			badge.setId((Integer)(row.get("badge_id")));
			badge.setText((String)(row.get("text")));
			badge.setVariant((String)(row.get("variant")));
			
			Navigration nav = new Navigration();
			nav.setId((Integer)(row.get("id")));
			nav.setName((String)row.get("name"));
			nav.setSortNum((Integer)row.get("sort_num"));
			nav.setUrl((String)row.get("url"));
			nav.setTitle((Boolean)row.get("title"));
			nav.setIcon((String)row.get("icon"));
			nav.setBadge(badge);
			navs.add(nav);
		}
		return navs;
	}

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

}
