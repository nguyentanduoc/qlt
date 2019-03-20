package com.vn.ctu.qlt.service;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchsSeletionDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;

public interface BranchService {

	public void save(BranchDto branch);
	
	public void save(Branch branch);

	public Page<BranchDto> findAll(Pageable pageable);
	
	public void deleteAll(Long[] keys);
	
	public Page<BranchDto> search(String condition, Pageable pageable);
	
	public PageImpl<BranchDto> getBranhByDirector(Long idDirector, Pageable pageable);
	
	public Set<Branch> selectBranchByDirector(Long idDirector);
	
	public Set<BranchDto> selectBranchByDirectorDto(Long idDirector);
	
	public Set<Branch> findByList(Set<BranchsSeletionDto> branchs);
	
	public Branch getBranchByEmployee(Employee employee);
	
	public Branch getBranchById(Long id);
}
