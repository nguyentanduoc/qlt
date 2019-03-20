package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Badge;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.repository.NavigrationRepository;

@Component
public class NavigrationMapper implements RowMapper<Navigration> {

	@Autowired
	private NavigrationRepository navigrationRepository;
	
	@Override
	public Navigration mapRow(ResultSet rs, int rowNum) throws SQLException {
		Set<Navigration> children = Collections.emptySet();
		if(rs.getBoolean("has_children")) {
			children = navigrationRepository.getChildren(rs.getLong("id"));
		}
		Badge badge = new Badge();
		if (rs.getObject("badge_id") != null) {
			badge.setId(rs.getInt("badge_id"));
			badge.setText(rs.getString("text"));
			badge.setVariant(rs.getString("variant"));
		}
		Navigration nav = new Navigration();
		nav.setId(rs.getLong("id"));
		nav.setBadge(badge);
		nav.setUrl(rs.getString("url"));
		nav.setIcon(rs.getString("icon"));
		nav.setTitle(rs.getBoolean("title"));
		nav.setName(rs.getString("name"));
		nav.setChildren(children);
		return nav;
	}
}
