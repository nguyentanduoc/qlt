package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.BranchSaveExport;
import com.vn.ctu.qlt.dto.ProductAndBranchId;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.dto.UnitDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.ProductOfBranch;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path = "/api/export")
public class ExportController {

    @Autowired
    private SpecUnitService specUnitService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/get-spec-and-unit-and-price-and-quantity-in-store")
    public ResponseEntity<Map<String, Object>> getSpecAndPriceAndQuality(@RequestBody ProductAndBranchId productAndBranchId) {
        Map<String, Object> response = new HashMap<>();
        Set<SpecUnitSelectionDto> specUnits = productService.getSpecUnit(productAndBranchId.getProductId());
        response.put("specUnits", specUnits);
        Branch branch = branchService.getBranchById(productAndBranchId.getBranchId());
        List<ProductOfBranch> productsOfBranch = branch.getProductsOfBranch();

        ProductOfBranch productOfBranchAmount = productsOfBranch.stream().filter(productOfBranch -> {
            return productOfBranch.getProduct().getId().equals(productAndBranchId.getProductId());
        }).findAny().orElse(null);
        response.put("quantity", productOfBranchAmount.getAmount());
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(path="/save")
    public ResponseEntity<Void> save(@RequestBody BranchSaveExport branchSaveExport){
        return new ResponseEntity(HttpStatus.OK);
    }
}
