package com.vn.ctu.qlt.sevice.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.model.Shop;

@Component
public class ShopMapper implements RowMapper<Shop> {

    @Override
    public Shop mapRow(ResultSet rs, int rowNum) throws SQLException {
        Shop shop = new Shop();
        shop.setId(rs.getLong("ma"));
        shop.setNameShop(rs.getString("ten_cua_hang"));
        shop.setIsEnabled(rs.getBoolean("hoat_dong"));
        shop.setEstablishAt(rs.getTimestamp("ngay_thanh_lap"));
        shop.setCreatedAt(rs.getTimestamp("ngay_tao"));
        shop.setUpdatedAt(rs.getTimestamp("ngay_cap_nhat"));
        return shop;
    }
}
