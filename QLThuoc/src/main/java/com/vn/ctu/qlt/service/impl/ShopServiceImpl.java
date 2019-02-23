package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.repository.ShopRepository;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.sevice.mapper.ShopMapper;

@Service
public class ShopServiceImpl implements ShopService {

	static final StringBuilder FromTableName = new StringBuilder(" from cua_hang ");

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private ShopRepository shopRepository;

	@Autowired
	private ShopMapper shopMapper;

	@Override
	public void save(Shop shop) {
		shopRepository.save(shop);
	}

	@Override
	public Page<Shop> select(String condition, Pageable page) {
		if (condition != null) {
			String[] conditions = condition.split(" ");
			List<String> params = new ArrayList<>();
			StringBuilder sqlSelect = new StringBuilder("select *").append(" ");
			StringBuilder sqlWhere = new StringBuilder("where").append(" ");

			for (int i = 0; i < conditions.length; i++) {
				sqlWhere.append("ten_cua_hang like ? ");
				params.add("%" + conditions[i] + "%");
				if (conditions.length - 1 != i)
					sqlWhere.append("or").append(" ");
			}

			int countRecord = count(FromTableName.append(sqlWhere), params);
			StringBuilder sql = sqlSelect.append(FromTableName);
			sql.append("LIMIT ").append(page.getPageSize()).append(" ");
			sql.append("OFFSET ").append(page.getOffset());
			List<Shop> result = jdbcTemplate.query(sql.toString(), params.toArray(), shopMapper);
			return new PageImpl<Shop>(result, page, countRecord);
		} else {
			return shopRepository.findAll(page);
		}
	}

	public int count(StringBuilder sql, List<String> params) throws DataAccessException {
		StringBuilder sqlCount = new StringBuilder("Select count(*) ");
		sqlCount.append(sql);
		try {
			return jdbcTemplate.queryForObject(sqlCount.toString(), params.toArray(), Integer.class);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	@Override
	public void delete(Long[] keys) {
		// TODO Auto-generated method stub

	}

}
