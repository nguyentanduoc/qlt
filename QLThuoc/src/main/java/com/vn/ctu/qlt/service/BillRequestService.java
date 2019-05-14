package com.vn.ctu.qlt.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.vn.ctu.qlt.dto.BillRequestDto;
import com.vn.ctu.qlt.dto.BillRequestWithConditionDto;
import com.vn.ctu.qlt.dto.DetailRequestDto;
import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.BillRequest;

import javax.swing.text.html.Option;

public interface BillRequestService {

    void save(ImportProductDto data);

    List<BillRequestDto> getBillRequest(BillRequestWithConditionDto dto);

    List<DetailRequestDto> getDetail(Long id);

    void accept(Long id);

    void cancel(Long id);

    List<BillRequest> findAll();

    Optional<BillRequest> findById(Long id);

    List<BillRequest> findByDateCreated(Date date);

    List<BillRequestDto> convertList(List<BillRequest> billRequests);

    BillRequestDto convertObject (BillRequest billRequest);
}
