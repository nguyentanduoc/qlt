package com.vn.ctu.qlt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.BillRequestDto;
import com.vn.ctu.qlt.dto.BillRequestWithConditionDto;
import com.vn.ctu.qlt.dto.DetailRequestDto;
import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.service.BillRequestService;

@RestController
@RequestMapping("/api/request")
public class BillRequestController {

	@Autowired
	private BillRequestService billRequestService;

	@PostMapping(path = "/save")
	public ResponseEntity<Void> save(@RequestBody ImportProductDto data) {
		billRequestService.save(data);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@PostMapping(path = "/get-bill-request")
	public ResponseEntity<List<BillRequestDto>> getBillReuqest(@RequestBody BillRequestWithConditionDto dto) {
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
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@PostMapping(path = "/cancel")
	public ResponseEntity<Void> cancel(@RequestBody Long id) {
		billRequestService.cancel(id);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
