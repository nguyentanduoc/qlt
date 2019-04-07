package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.service.NavService;
import com.vn.ctu.qlt.sevice.mapper.NavigrationMapper;

@Service
@Transactional
public class NavServiceImpl implements NavService {

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private NavigrationMapper navigrationMapper;

	@Override
	public List<Navigration> getNavListRoleName(Collection<? extends GrantedAuthority> roleNames) {
		if(roleNames.size() <= 0) return null;
		StringBuilder sqlBuilder = new StringBuilder();
		sqlBuilder.append(
				"select nav.ma, nav.ten, nav.url, nav.icon,nav.tieu_de,nav.co_danh_muc_con, "
						+ "nav.la_danh_muc_cha, nav.ma_huy_hieu, nav.bien_the, nav.chuoi, nav.la_chi_nhanh_chinh from ("
						+ "	select distinct ON (danh_muc.ma) danh_muc.ma, danh_muc.ten, danh_muc.url, "
						+ " danh_muc.icon, danh_muc.tieu_de, danh_muc.so_thu_tu, danh_muc.co_danh_muc_con, "
						+ " danh_muc.la_danh_muc_cha, danh_muc.la_chi_nhanh_chinh, huy_hieu.ma as ma_huy_hieu, huy_hieu.chuoi, huy_hieu.bien_the "
						+ " from danh_muc"
						+ "	inner join quyen_danh_muc navr on danh_muc.ma = navr.ma_danh_muc"
						+ "	left join quyen on navr.ma_quyen = quyen.ma"
						+ "	left join huy_hieu on huy_hieu.ma = danh_muc.ma_huy_hieu")
				.append(" where danh_muc.la_danh_muc_cha = false and (");
		List<String> roleArgs = new ArrayList<>();
		int i = 0;
		for (GrantedAuthority role : roleNames) {
			roleArgs.add(role.getAuthority());
			sqlBuilder.append("quyen.ten_quyen = ? ");
			if (roleNames.size() - 1 != i)
				sqlBuilder.append("or").append(" ");
			i++;
		}
		sqlBuilder.append(" )) nav order by nav.so_thu_tu ASC");
		// jdbcTemplate.query(sqlBuilder.toString(), new
		// BeanPropertyRowMapper<Navigration>(Navigration.class));

		return jdbcTemplate.query(sqlBuilder.toString(), roleArgs.toArray(), navigrationMapper);
	}

}
