package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.ProducerSeletion;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.service.ProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/producer")
public class ProducerController {

    @Autowired
    private ProducerService producerService;

    @PostMapping(path = "/get-all")
    public ResponseEntity<List<ProducerSeletion>> getAll() {
        return ResponseEntity.ok().body(producerService.getAllProducer());
    }

    @PostMapping(path = "/save")
    public ResponseEntity<List<ProducerSeletion>> save(@RequestBody String producerName) {
        try {
            producerService.save(producerName);
            return ResponseEntity.ok().body(producerService.getAllProducer());
        } catch (Exception e) {
            throw new BadRequestException("Dữ liệu đã tồn tại");
        }
    }
}
