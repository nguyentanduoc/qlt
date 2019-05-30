package com.vn.ctu.qlt.controller;

import java.util.*;

import com.vn.ctu.qlt.dto.BillImportDto;
import com.vn.ctu.qlt.dto.DetailBillImportDto;
import com.vn.ctu.qlt.dto.ImportConditionDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.BillImport;
import com.vn.ctu.qlt.model.DetailBillImport;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.service.ImportProductService;
import com.vn.ctu.qlt.service.ProductService;

/**
 * The Class ImportRoduct.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class ImportProductController {

    /**
     * The product service.
     */
    @Autowired
    private ProductService productService;

    @Autowired
    private ImportProductService importProductService;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Inits the.
     *
     * @return the response entity
     */
    @PostMapping(path = "/api/import-product/init")
    public ResponseEntity<Map<String, Object>> init() {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("products", productService.getAllForSeletionWithProducer());
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(path = "/api/import-product/save")
    public ResponseEntity<Void> save(@RequestBody ImportProductDto importProductDto) {
        importProductService.save(importProductDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/api/import-product/search")
    public ResponseEntity<List<BillImportDto>> search(@RequestBody ImportConditionDto importConditionDto) {
        List<BillImport> billImports = new ArrayList<>();
        if (importConditionDto.getId() == 0 && importConditionDto.getDateCreated() == null)
            billImports = importProductService.findAll();
        if(importConditionDto.getId() != 0 && importConditionDto.getDateCreated() == null)
            billImports.add(importProductService.findById(importConditionDto.getId()).get());
        if(importConditionDto.getId() == 0 && importConditionDto.getDateCreated() != null)
            billImports = importProductService.findByDate(importConditionDto.getDateCreated());
        if(importConditionDto.getId() != 0 && importConditionDto.getDateCreated() != null)
            billImports = importProductService.findByDateAndId(importConditionDto);
        return ResponseEntity.ok().body(importProductService.convertList(billImports));
    }

    @PostMapping(path = "/api/import-product/get-detail")
    public ResponseEntity<List<DetailBillImportDto>> getDetail(@RequestBody Long id){
        Optional<BillImport> billImportOptional = importProductService.findById(id);
        if(!billImportOptional.isPresent()) throw new BadRequestException("Không tìm thấy hóa đơn");
        BillImport billImport = billImportOptional.get();
        List<DetailBillImportDto> detailBillImportsDto = new ArrayList<>();
        for(DetailBillImport detailBillImport : billImport.getDetailBillImports()){
            detailBillImportsDto.add(modelMapper.map(detailBillImport, DetailBillImportDto.class));
        }
        return ResponseEntity.ok().body(detailBillImportsDto);
    }
}
