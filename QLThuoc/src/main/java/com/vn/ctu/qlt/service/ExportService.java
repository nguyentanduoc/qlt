package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.BillExportDto;
import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchSaveExport;
import com.vn.ctu.qlt.model.BillExport;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ExportService {

    void save(BranchSaveExport branchSaveExport);
    List<BillExport> findAll();
    List<BillExportDto> convert(List<BillExport> billExports);
    Optional<BillExport> findById(Long id);
    List<BillExport> findAllByDate(Date date);
    List<BillExport> findBillExportDateCreatedBetween(List<Date> dates, BranchDto branchDto);
}
