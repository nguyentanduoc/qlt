package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.SpecLevelBranch;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecLevelBranchRepository extends PagingAndSortingRepository<SpecLevelBranch, Long> {
}
