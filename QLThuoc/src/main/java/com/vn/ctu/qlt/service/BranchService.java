package com.vn.ctu.qlt.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.model.Branch;

public interface BranchService {

	public void save(Branch branch);

	public Page<Branch> findAll(Pageable pageable);
	
	public void deleteAll(Long[] keys);
	
	public Page<Branch> search(String condition, Pageable pageable);
}
