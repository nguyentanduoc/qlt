package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.BillImport;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

@Repository
public interface BillImportRepository extends JpaRepository<BillImport, Long> {

    List<BillImport> findAllByImportDate(Date importDate);
    List<BillImport> findAllByIdAndImportDate(Long id, Date importDate);
    List<BillImport> findAllByImportDateBetweenAndBranch(Date start, Date end, Branch branch);

}
