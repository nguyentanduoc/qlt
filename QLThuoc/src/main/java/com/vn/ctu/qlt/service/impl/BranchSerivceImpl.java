package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

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

import com.vn.ctu.qlt.mapper.BranchMapper;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.repository.BranchRepository;
import com.vn.ctu.qlt.service.BranchService;

@Service
public class BranchSerivceImpl implements BranchService {
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	private final String FROM_TABLE = "from chi_nhanh ";

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private BranchRepository branchRepository;

	@Autowired
	private BranchMapper branchMapper;

	public void save(Branch branch) {
		branchRepository.save(branch);
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
	@Transactional
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
			
			int countRecord = count(sqlFrom.append(sqlWhere), params);
			
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
}
