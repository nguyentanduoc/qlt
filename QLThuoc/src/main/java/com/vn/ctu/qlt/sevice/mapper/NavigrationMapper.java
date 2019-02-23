package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Badge;
import com.vn.ctu.qlt.model.Navigration;

@Component
public class NavigrationMapper implements RowMapper<Navigration> {

	@Override
	public Navigration mapRow(ResultSet rs, int rowNum) throws SQLException {
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
				.build();
	}
}
