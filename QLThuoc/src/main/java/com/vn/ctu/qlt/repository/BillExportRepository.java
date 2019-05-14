package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.BillExport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BillExportRepository extends JpaRepository<BillExport, Long> {
    List<BillExport> findAllByDateCreated(Date dateCreated);
}
