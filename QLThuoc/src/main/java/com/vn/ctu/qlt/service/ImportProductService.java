package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.BillImportDto;
import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.ImportConditionDto;
import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.BillImport;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ImportProductService {

	void save(ImportProductDto importProductDto);
	Optional<BillImport> findById(Long id);
	List<BillImport> findByDate(Date date);
	List<BillImport> findByDateAndId(ImportConditionDto importConditionDto);
	List<BillImport> findAll();
	BillImportDto convertObject(BillImport billImport);
	List<BillImportDto> convertList(List<BillImport> billImports);
	List<BillImport> findBillImportBetween(List<Date> datesCreated, BranchDto branchDto);
}
