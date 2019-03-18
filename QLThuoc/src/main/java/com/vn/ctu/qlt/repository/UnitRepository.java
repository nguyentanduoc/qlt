package com.vn.ctu.qlt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.Unit;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Long> {

}
