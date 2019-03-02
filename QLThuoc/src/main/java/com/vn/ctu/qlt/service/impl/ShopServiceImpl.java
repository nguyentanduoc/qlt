package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.ShopRepository;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.UserSerivce;
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
	
	@Autowired
	private UserSerivce userSerivce;
	
	@Value("${app.domain.email}")
	private String domainEmail;
	
	@Autowired
	private EmployeeService employeeService;

	@Override
	@Transactional
	public Map<String, Object> save(ShopDto shopDto) {
		String name[] = shopDto.getNameShop().split(" ");
		StringBuilder userName = new StringBuilder();
		for (String s : name) {
			userName.append(StringUtils.lowerCase(StringUtils.stripAccents(s)));
		}
		userName.append("admin");
		String passWord = RandomStringUtils.randomAlphabetic(10);
		User user = new User();
		user.setUsername(userName.toString());
		user.setEmail(userName.append(domainEmail).toString());
		user.setPassword(passWord);
		user.setIsEnabled(true);
		userSerivce.createUserDireactor(user);
		
		Employee employee = new Employee();
		employee.setNameEmployee(shopDto.getFullName());
		employee.setUser(user);
		employeeService.save(employee);
		
		Shop shop = new Shop();
		shop.setId(shopDto.getId());
		shop.setNameShop(shopDto.getNameShop());
		shop.setCreatedAt(shopDto.getCreatedAt());
		shop.setUpdatedAt(shopDto.getUpdatedAt());
		shop.setEstablishAt(shopDto.getEstablishAt());
		shop.setIsEnabled(true);
		shop.setEmployee(employee);
		shopRepository.save(shop);
		
		Map<String, Object> result = new HashMap<>();
		result.put("account", user);
		result.put("shop", shop);
		result.put("password", passWord);
		return result;
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
	@Transactional
	public void delete(Long[] keys) {
		for (Long key : keys) {
			shopRepository.deleteById(key);
		}
	}

	@Override
	public Iterable<Shop> selectAll() {
		return shopRepository.findAll();
	}

	@Override
	public Optional<Shop> findById(Long id) {
		return shopRepository.findById(id);
	}
}
