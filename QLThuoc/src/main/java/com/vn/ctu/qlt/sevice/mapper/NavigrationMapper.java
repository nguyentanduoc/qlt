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
		return Navigration.builder()
				.withId(rs.getInt("id"))
				.withBadge(badge)
				.withUrl(rs.getString("url"))
				.withIcon(rs.getString("icon"))
				.withTitle(rs.getBoolean("title"))
				.withName(rs.getString("name"))
				.withChirent(children)
				.build();
	}
}
