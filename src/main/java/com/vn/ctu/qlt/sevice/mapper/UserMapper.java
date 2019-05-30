package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Set;

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
            Set<Role> roles = roleService.getRoleByUserId(rs.getLong("ma"));
            User user = new User();
            user.setId(rs.getLong("ma"));
            user.setUsername(rs.getString("ten_dang_nhap"));
            user.setEmail(rs.getString("email"));
            user.setPassword(rs.getString("mat_khau"));
            user.setIsEnabled(rs.getBoolean("hoat_dong"));
            user.setCreatedAt(rs.getTimestamp("ngay_tao"));
            user.setUpdatedAt(rs.getTimestamp("ngay_cap_nhat"));
            user.setIsAdmin(rs.getBoolean("la_quan_tri"));
            user.setRoles(roles);
            return user;
        } catch (Exception e) {
            logger.error(String.format("Class Name %s error message %s", "UserMapper", e.getMessage()));
            throw e;
        }
    }

}
