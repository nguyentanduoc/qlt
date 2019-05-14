package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.*;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.ExportService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.*;

@RestController
@RequestMapping(path = "/api/export")
public class ExportController {

    @Autowired
    private BranchService branchService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ExportService exportService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping(path = "/get-spec-and-unit-and-price-and-quantity-in-store")
    public ResponseEntity<Map<String, Object>> getSpecAndPriceAndQuality(@RequestBody ProductAndBranchId productAndBranchId) {
        Map<String, Object> response = new HashMap<>();
        Set<SpecUnitSelectionDto> specUnits = productService.getSpecUnit(productAndBranchId.getProductId());
        response.put("specUnits", specUnits);
        Branch branch = branchService.getBranchById(productAndBranchId.getBranchId());
        List<ProductOfBranch> productsOfBranch = branch.getProductsOfBranch();
        ProductOfBranch productOfBranchAmount = productsOfBranch.stream().filter(productOfBranch ->
                productOfBranch.getProduct().getId().equals(productAndBranchId.getProductId()))
                .findAny().orElse(null);
        PriceHistory priceHistory = productService.getPriceByBranch(productAndBranchId.getProductId());
        if (branch.getSpecLevelBranch() != null) {
            Double price = priceHistory.getPrice() + (priceHistory.getPrice() * branch.getSpecLevelBranch().getPercentProfit());
            Double priceShare = priceHistory.getPrice() + (priceHistory.getPrice() * branch.getSpecLevelBranch().getPercentProfitShare());
            if (productOfBranchAmount == null)
                throw new AssertionError("getSpecAndPriceAndQuality: productOfBranchAmount is null");
            response.put("inventory", productOfBranchAmount.getAmount());
            response.put("price", price);
            response.put("priceShare", priceShare);
            response.put("priceHistory", priceHistory.getId());
            response.put("productDto", productService.getProductForExport(productOfBranchAmount.getProduct().getId()));
            return ResponseEntity.ok().body(response);
        } else {
            throw new BadRequestException("Chi nhánh chưa được xếp cấp độ");
        }
    }

    @PostMapping(path = "/save")
    public ResponseEntity save(@Valid @RequestBody BranchSaveExport branchSaveExport) {
        exportService.save(branchSaveExport);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/get-inventory")
    public ResponseEntity<Double> getInventory(@Valid @RequestBody ProductAndSpecUnit productAndSpecUnit){
        Double inventory = productService.getInventory(productAndSpecUnit);
        return ResponseEntity.ok(inventory);
    }

    @PostMapping(path = "/search")
    public ResponseEntity<List<BillExportDto>> search(@RequestBody ExportConditionDto exportConditionDto){
        List<BillExport> billsExport = new ArrayList<>();
        if(exportConditionDto.getId() == 0 && exportConditionDto.getDateCreated() == null)
            billsExport = exportService.findAll();
        if(exportConditionDto.getId() == 0 && exportConditionDto.getDateCreated() != null)
            billsExport = exportService.findAllByDate(exportConditionDto.getDateCreated());
        if(exportConditionDto.getId() != 0 && exportConditionDto.getDateCreated() == null)
            billsExport.add(exportService.findById(exportConditionDto.getId()).get());
        return ResponseEntity.ok().body(exportService.convert(billsExport));
    }

    @PostMapping(path = "/get-detail")
    public ResponseEntity<List<DetailBillExportDto>> getDetail(@RequestBody Long id){
        Optional<BillExport> billExport = exportService.findById(id);
        if(!billExport.isPresent()) throw new BadRequestException("Không tìm thấy hóa đơn");
        List<DetailBillExport> detailBillExports = billExport.get().getDetailBillExports();
        List<DetailBillExportDto> detailBillExportsDto = new ArrayList<>();
        for(DetailBillExport detailBillExport: detailBillExports){
            detailBillExportsDto.add(modelMapper.map(detailBillExport, DetailBillExportDto.class));
        }
        return ResponseEntity.ok().body(detailBillExportsDto);
    }
}
