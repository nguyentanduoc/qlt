package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchsSeletionDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.BranchRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.UserSerivce;
import com.vn.ctu.qlt.sevice.mapper.BranchMapper;

/**
 * The Class BranchSerivceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
@Transactional
public class BranchServiceImpl implements BranchService {

	/** The from table. */
	private final String FROM_TABLE = "from chi_nhanh ";

	/** The jdbc template. */
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/** The branch repository. */
	@Autowired
	private BranchRepository branchRepository;

	/** The shop service. */
	@Autowired
	private ShopService shopService;

	/** The branch mapper. */
	@Autowired
	private BranchMapper branchMapper;

	/** The employee service. */
	@Autowired
	private EmployeeService employeeService;

	/** The user service. */
	@Autowired
	private UserSerivce userService;

	@Autowired
	private IAuthenticationFacade authenticationFacade;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.BranchService#save(com.vn.ctu.qlt.dto.BranchDto)
	 */
	public void save(BranchDto branch) {
		Employee employee = authenticationFacade.getEmployee();
		Shop shop = shopService.findShopByDirector(employee).get();
		Branch branchModel = new Branch();
		BeanUtils.copyProperties(branch, branchModel);
		branchModel.setShop(shop);
		branchRepository.save(branchModel);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.vn.ctu.qlt.service.BranchService#findAll(org.springframework.data.domain.
	 * Pageable)
	 */
	@Override
	public Page<BranchDto> findAll(Pageable pageable) {
		Page<Branch> pageBranch = branchRepository.findAll(pageable);
		List<Branch> branchs = pageBranch.getContent();
		
		List<BranchDto> branchsDto = new ArrayList<BranchDto>();
		branchs.forEach(action -> {
			BranchDto branchDto = new BranchDto();
			BeanUtils.copyProperties(action, branchDto);
			branchsDto.add(branchDto);
		});
		return new PageImpl<>(branchsDto,pageable, pageBranch.getTotalPages());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.BranchService#deleteAll(java.lang.Long[])
	 */
	@Override
	public void deleteAll(Long[] keys) {
		for (Long id : keys) {
			branchRepository.deleteById(id);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.BranchService#search(java.lang.String,
	 * org.springframework.data.domain.Pageable)
	 */
	@Override
	public Page<BranchDto> search(String condition, Pageable pageable) {
		String[] conditions = condition.split(" ");
		String[] commonSubtract = { "Chi", "Nhanh", "chi", "nhanh", "nhánh", "Nhánh" };
		Collection<String> subtract = CollectionUtils.subtract(Arrays.asList(conditions),
				Arrays.asList(commonSubtract));
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
		return new PageImpl<BranchDto>((List<BranchDto>) modelToDto(resultBranch), pageable, countRecord);
	}

	/**
	 * Count.
	 *
	 * @param sql    the sql
	 * @param params the params
	 * @return the long
	 * @throws DataAccessException the data access exception
	 */
	public Long count(StringBuilder sql, Object[] params) throws DataAccessException {
		StringBuilder sqlCount = new StringBuilder("Select count(*) ");
		sqlCount.append(sql);
		return jdbcTemplate.queryForObject(sqlCount.toString(), params, Long.class);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.BranchService#getBranhByDirector(java.lang.Long,
	 * org.springframework.data.domain.Pageable)
	 */
	@Override
	public PageImpl<BranchDto> getBranhByDirector(Long idDirector, Pageable pageable) {
		Object[] param = new Long[] { idDirector };
		StringBuilder sql = new StringBuilder();
		StringBuilder where = new StringBuilder();

		sql.append("select chi_nhanh.id, chi_nhanh.dia_chi, chi_nhanh.hoat_dong, chi_nhanh.chi_nhanh_chinh, ");
		sql.append("chi_nhanh.kinh_do, chi_nhanh.vi_do, chi_nhanh.ten_chi_nhanh, chi_nhanh.cua_hang_id ");
		where.append("from chi_nhanh ");
		where.append("inner join cua_hang on chi_nhanh.cua_hang_id = cua_hang.id ");
		where.append("inner join nhan_vien on cua_hang.nhan_vien_id = nhan_vien.id ");
		where.append("inner join tai_khoan on nhan_vien.tai_khoan_id = tai_khoan.id ");
		where.append("where tai_khoan.id =? ");

		Long countRecord = count(where, param);

		sql.append(where).append("LIMIT ").append(pageable.getPageSize()).append(" ");
		sql.append("OFFSET ").append(pageable.getOffset());
		List<Branch> resultBranch = jdbcTemplate.query(sql.toString(), param, branchMapper);
		return new PageImpl<BranchDto>((List<BranchDto>) modelToDto(resultBranch), pageable, countRecord);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.vn.ctu.qlt.service.BranchService#selectBranchByDirector(java.lang.Long)
	 */
	@Override
	public Set<Branch> selectBranchByDirector(Long idDirector) {
		Optional<User> userOptional = userService.findById(idDirector);
		Optional<Employee> employeeOptional = employeeService.findEmployeeByUser(userOptional.get());
		Optional<Shop> shopOptional = shopService.findShopByDirector(employeeOptional.get());
		Shop shop = shopOptional.get();
		return shop.getBranchs();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.BranchService#findByList(java.util.Set)
	 */
	@Override
	@Transactional
	public Set<Branch> findByList(Set<BranchsSeletionDto> branchs) {
		Set<Branch> branchsResult = new HashSet<>();
		for (BranchsSeletionDto b : branchs) {
			Branch branch = branchRepository.findById(b.getValue()).get();
			branchsResult.add(branch);
		}
		return branchsResult;
	}

	@Override
	public Branch getBranchByEmployee(Employee employee) {
		return null;
	}

	@Override
	public Branch getBranchById(Long id) {
		Optional<Branch> branchOptional = branchRepository.findById(id);
		if (branchOptional.isPresent()) {
			return branchOptional.get();
		} else
			return null;
	}

	@Override
	public void save(Branch branch) {
		branchRepository.save(branch);
	}

	private List<BranchDto> modelToDto(List<Branch> branchs){
		List<BranchDto> branchsDto = new ArrayList<BranchDto>();
		branchs.forEach(action -> {
			BranchDto branchDto = new BranchDto();
			BeanUtils.copyProperties(action, branchDto);
			branchsDto.add(branchDto);
		});
		return branchsDto;
	}
	
	private Set<BranchDto> modelToDto(Set<Branch> branchs){
		Set<BranchDto> branchsDto = new HashSet<BranchDto>();
		branchs.forEach(action -> {
			BranchDto branchDto = new BranchDto();
			BeanUtils.copyProperties(action, branchDto);
			branchsDto.add(branchDto);
		});
		return branchsDto;
	}

	@Override
	public Set<BranchDto> selectBranchByDirectorDto(Long idDirector) {
		Optional<User> userOptional = userService.findById(idDirector);
		Optional<Employee> employeeOptional = employeeService.findEmployeeByUser(userOptional.get());
		Optional<Shop> shopOptional = shopService.findShopByDirector(employeeOptional.get());
		Shop shop = shopOptional.get();
		return modelToDto(shop.getBranchs());
	}

	@Override
	public Branch getMainBranchByBranch(Long id) {
		Optional<Branch> branch = branchRepository.findById(id);
		if(branch.isPresent()) {
			Shop shop = branch.get().getShop();
			Set<Branch> branchs = shop.getBranchs();
			return branchs.stream().filter(b -> b.getIsMain() == true).findAny().orElse(null);
		} else {
			throw new BadRequestException("Không tìm thấy chi nhánh");
		}
	}
}
