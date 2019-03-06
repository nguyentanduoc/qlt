package com.vn.ctu.qlt.service;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchsSeletionDto;
import com.vn.ctu.qlt.model.Branch;

public interface BranchService {

	public void save(BranchDto branch);

	public Page<Branch> findAll(Pageable pageable);
	
	public void deleteAll(Long[] keys);
	
	public Page<Branch> search(String condition, Pageable pageable);
	
	public PageImpl<Branch> getBranhByDirector(Long idDirector, Pageable pageable);
	
	public Set<Branch> selectBranchByDirector(Long idDirector);
	
	public Set<Branch> findByList(Set<BranchsSeletionDto> branchs);
}
