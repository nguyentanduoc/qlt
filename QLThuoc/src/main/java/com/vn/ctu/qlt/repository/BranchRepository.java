package com.vn.ctu.qlt.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.Branch;

import java.util.List;

@Repository
public interface BranchRepository extends PagingAndSortingRepository<Branch, Long> {
}
