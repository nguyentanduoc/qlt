package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.BillExport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillExportRepository extends JpaRepository<BillExport, Long> {
}
