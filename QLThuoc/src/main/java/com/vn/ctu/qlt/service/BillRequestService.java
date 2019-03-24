package com.vn.ctu.qlt.service;

import java.util.List;

import com.vn.ctu.qlt.dto.BillRequestDto;
import com.vn.ctu.qlt.dto.BillRequestWithConditionDto;
import com.vn.ctu.qlt.dto.DetailRequestDto;
import com.vn.ctu.qlt.dto.ImportProductDto;

public interface BillRequestService {

	public void save(ImportProductDto data);
	
	public List<BillRequestDto> getBillRequest(BillRequestWithConditionDto dto);
	
	public List<DetailRequestDto> getDetail(Long id);
	
	public void accept(Long id);
	
	public void cancel(Long id);
}
