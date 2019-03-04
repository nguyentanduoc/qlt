package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.BranchRepository;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.UserSerivce;
import com.vn.ctu.qlt.sevice.mapper.BranchMapper;

@Service
@Transactional
public class BranchSerivceImpl implements BranchService {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final String FROM_TABLE = "from chi_nhanh ";

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private BranchRepository branchRepository;
	
	@Autowired 
	private ShopService shopService;

	@Autowired
	private BranchMapper branchMapper;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private UserSerivce userService;

	public void save(BranchDto branch) {
		Optional<Employee> empOptional = employeeService.findById(branch.getIdDirector());
		
		Optional<Shop> shop = shopService.findShopByDirector(empOptional.get());
		Branch branchModel = Branch.builder()
				.withAddress(branch.getAddress())
				.withId(branch.getId())
				.withIsEnabled(branch.getIsEnabled())
				.withLatitude(branch.getLatitude())
				.withLongitude(branch.getLongitude())
				.withShop(shop.get())
				.withName(branch.getName())
				.build();
		branchRepository.save(branchModel);
	}

	@Override
	public Page<Branch> findAll(Pageable pageable) {
		return branchRepository.findAll(pageable);
	}

	@Override
	public void deleteAll(Long[] keys) {
		for (Long id : keys) {
			branchRepository.deleteById(id);
		}
	}

	@Override
	public Page<Branch> search(String condition, Pageable pageable) {
		try {
			String[] conditions = condition.split(" ");
			String[] commonSubtract = {"Chi", "Nhanh", "chi", "nhanh", "nhánh", "Nhánh"};
			Collection<String> subtract = CollectionUtils.subtract(Arrays.asList(conditions), Arrays.asList(commonSubtract));
			List<String> params = new ArrayList<>();
			
			StringBuilder sqlSelect = new StringBuilder("select * ");
			StringBuilder sqlFrom = new StringBuilder(FROM_TABLE);
			StringBuilder sqlWhere = new StringBuilder("where ");
	
			for (int i = 0; i < subtract.size(); i++) {
				sqlWhere.append("ten_chi_nhanh like ? ");
				params.add("%" + subtract.toArray()[i] + "%");
				if (subtract.size() - 1 != i)
					sqlWhere.append("or").append(" ");
			}
			
			Long countRecord = count(sqlFrom.append(sqlWhere), params.toArray());
			
			StringBuilder sql = sqlSelect.append(sqlFrom);
			sql.append("LIMIT ").append(pageable.getPageSize()).append(" ");
			sql.append("OFFSET ").append(pageable.getOffset());
			List<Branch> resultBranch = jdbcTemplate.query(sql.toString(), params.toArray(), branchMapper);
			return new PageImpl<Branch>(resultBranch, pageable, countRecord);
		} catch (Exception e) {
			logger.error(e.toString());
			throw e;
		}
	}
	
	public Long count(StringBuilder sql, Object[] params) throws DataAccessException {
		StringBuilder sqlCount = new StringBuilder("Select count(*) ");
		sqlCount.append(sql);
		try {
			return jdbcTemplate.queryForObject(sqlCount.toString(), params, Long.class);
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	
	@Override
	public PageImpl<Branch> getBranhByDirector(Long idDirector, Pageable pageable) {
		try {
			Object[] param = new Long[] {idDirector};
			StringBuilder sql = new StringBuilder();
			StringBuilder where = new StringBuilder();
			
			sql.append("select chi_nhanh.id, chi_nhanh.dia_chi, chi_nhanh.hoat_dong, ");
			sql.append("chi_nhanh.kinh_do, chi_nhanh.vi_do, chi_nhanh.ten_chi_nhanh, chi_nhanh.id_cua_hang ");
			where.append("from chi_nhanh inner join cua_hang on chi_nhanh.id_cua_hang = cua_hang.id ");
			where.append("where cua_hang.id_nhan_vien = ? ");
			
			Long countRecord = count(where, param);
			
			sql.append(where).append("LIMIT ").append(pageable.getPageSize()).append(" ");
			sql.append("OFFSET ").append(pageable.getOffset());
			List<Branch> resultBranch = jdbcTemplate.query(sql.toString(), param, branchMapper);
			return new PageImpl<Branch>(resultBranch, pageable, countRecord);
			
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	@Override
	public Set<Branch> selectBranchByDirector(Long idDirector) {
		try {
			Optional<User> userOptional = userService.findById(idDirector);
			Optional<Employee> employeeOptional = employeeService.findEmployeeByUser(userOptional.get());
			Optional<Shop> shopOptional = shopService.findShopByDirector(employeeOptional.get());
			Shop shop = shopOptional.get();
			return shop.getBranchs();
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

}
