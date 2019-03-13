package com.vn.ctu.qlt.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.SpecUnit;

@Repository
public interface SpecUnitRepository extends PagingAndSortingRepository<SpecUnit, Long>{

}
