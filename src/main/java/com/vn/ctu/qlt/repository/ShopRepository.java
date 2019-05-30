package com.vn.ctu.qlt.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;

public interface ShopRepository extends PagingAndSortingRepository<Shop, Long> {

	public Page<Shop> findAll(Pageable pageable);

	public Optional<Shop> findByEmployee(Employee employee);
}
