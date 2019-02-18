package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.util.Lists;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.mapper.UserMapper;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.UserRepository;
import com.vn.ctu.qlt.service.UserSerivce;

@Service
public class UserServiceImpl implements UserSerivce {

	private final String FROM_TABLE = "from tai_khoan ";

	private String[] conditions;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	UserMapper userMapper;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public PageImpl<User> searchUser(String condition, Pageable page) {
		String[] conditions = condition.split(" ");
		this.conditions = conditions;
		List<String> param = new ArrayList<>();

		StringBuilder sqlSelect = new StringBuilder("select * ");
		StringBuilder sqlFrom = new StringBuilder(FROM_TABLE);
		StringBuilder sqlWhere = new StringBuilder("where ");

		for (int i = 0; i < conditions.length; i++) {
			sqlWhere.append("email like ?").append(" or ");
			sqlWhere.append("ten_dang_nhap like ?").append(" ");
			if (i == 0) {
				param.add(conditions[i] + "%");
				param.add(conditions[i] + "%");

			} else {
				if (i == conditions.length - 1) {
					param.add("%" + conditions[i]);
					param.add("%" + conditions[i]);
				} else {
					param.add("%" + conditions[i] + "%");
					param.add("%" + conditions[i] + "%");
				}
			}
			if (conditions.length - 1 != i)
				sqlWhere.append("or").append(" ");
		}
		int countRecord = count(sqlFrom.append(sqlWhere), param);
		StringBuilder sql = sqlSelect.append(sqlFrom);
		sql.append("LIMIT ").append(page.getPageSize()).append(" ");
		sql.append("OFFSET ").append(page.getOffset());

		List<User> resultUser = jdbcTemplate.query(sql.toString(), param.toArray(), userMapper);

		return new PageImpl<User>(resultUser, page, countRecord);
	}

	@Override
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

	public String[] getConditions() {
		return conditions;
	}

	public void setConditions(String[] conditions) {
		this.conditions = conditions;
	}

	@Override
	public List<User> findAll() {
		return Lists.newArrayList(userRepo.findAll());
	}

	@Override
	public Optional<User> findById(Long id) {
		return userRepo.findById(id);
	}

	@Override
	public void save(User user) {
		userRepo.save(user);
	}

	@Override
	public Page<User> getAllUser(Pageable pageable) {
		return userRepo.findAll(pageable);
	}
	
	@Override
	public void delete(Long[] ids) {
		for(Long id: ids) {
			userRepo.deleteById(id);
		}
	}
}