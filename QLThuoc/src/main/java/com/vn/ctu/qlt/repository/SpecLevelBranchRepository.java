package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.SpecLevelBranch;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecLevelBranchRepository extends PagingAndSortingRepository<SpecLevelBranch, Long> {

    public List<SpecLevelBranch> findAllByShop(Shop shop);
}
