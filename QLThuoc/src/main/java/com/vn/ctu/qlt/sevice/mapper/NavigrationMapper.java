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
		if(rs.getBoolean("co_danh_muc_con")) {
			children = navigrationRepository.getChildren(rs.getLong("ma"));
		}
		Badge badge = new Badge();
		if (rs.getObject("ma_huy_hieu") != null) {
			badge.setId(rs.getLong("ma_huy_hieu"));
			badge.setText(rs.getString("chuoi"));
			badge.setVariant(rs.getString("bien_the"));
		}
		Navigration nav = new Navigration();
		nav.setId(rs.getLong("ma"));
		nav.setBadge(badge);
		nav.setUrl(rs.getString("url"));
		nav.setIcon(rs.getString("icon"));
		nav.setTitle(rs.getBoolean("tieu_De"));
		nav.setName(rs.getString("ten"));
		nav.setIsMain(rs.getInt("la_chi_nhanh_chinh"));
		nav.setChildren(children);
		return nav;
	}
}
