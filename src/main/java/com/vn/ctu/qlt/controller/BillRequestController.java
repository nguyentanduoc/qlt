package com.vn.ctu.qlt.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.vn.ctu.qlt.dto.*;
import com.vn.ctu.qlt.model.BillRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.service.BillRequestService;

@RestController
@RequestMapping("/api/request")
public class BillRequestController {

    @Autowired
    private BillRequestService billRequestService;

    @PostMapping(path = "/save")
    public ResponseEntity<Void> save(@RequestBody ImportProductDto data) {
        billRequestService.save(data);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/get-bill-request")
    public ResponseEntity<List<BillRequestDto>> getBillRequest(@RequestBody BillRequestWithConditionDto dto) {
        List<BillRequestDto> body = billRequestService.getBillRequest(dto);
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(path = "/get-detail")
    public ResponseEntity<List<DetailRequestDto>> getDetail(@RequestBody Long id) {
        List<DetailRequestDto> body = billRequestService.getDetail(id);
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(path = "/accept")
    public ResponseEntity<Void> accept(@RequestBody Long id) {
        billRequestService.accept(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/cancel")
    public ResponseEntity<Void> cancel(@RequestBody Long id) {
        billRequestService.cancel(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/search")
    public ResponseEntity<List<BillRequestDto>> search(@RequestBody BillRequestConditionDto billRequestConditionDto) {
        List<BillRequest> billRequests = new ArrayList<>();
        if (billRequestConditionDto.getId() == 0 && billRequestConditionDto.getDateCreated() == null)
            billRequests = billRequestService.findAll();
        if (billRequestConditionDto.getId() != 0)
            billRequests.add(billRequestService.findById(billRequestConditionDto.getId()).get());
        if (billRequestConditionDto.getDateCreated() != null)
            billRequests = billRequestService.findByDateCreated(billRequestConditionDto.getDateCreated());

        return ResponseEntity.ok().body(billRequestService.convertList(billRequests));
    }

    @PostMapping(path = "/search-request-product")
    public ResponseEntity searchRequestProduct(@RequestBody SearchRequestProductDto searchRequestProductDto) {
        List<BillRequestDto> billRequestDtos = new ArrayList<>();
        if (searchRequestProductDto.getId() > 0) {
            Optional<BillRequest> optionalBillRequest = billRequestService.findById(searchRequestProductDto.getId());
            if (optionalBillRequest.isPresent())
                billRequestDtos.add(billRequestService.convertObject(optionalBillRequest.get()));
            return ResponseEntity.ok().body(billRequestDtos);
        }
        if (searchRequestProductDto.getDateCreated() != null && searchRequestProductDto.getDateCreated().size() == 2)
            return ResponseEntity.ok().body(billRequestService.searchBetweenDateCreated(searchRequestProductDto));
        return null;
    }

    @PostMapping(path = "/search-waiting-request")
    public ResponseEntity searchWaitingRequest(@RequestBody BranchDto branchDto) {
        return null;
    }
}
