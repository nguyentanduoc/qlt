package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.SpecUnitSaveDto;
import com.vn.ctu.qlt.dto.UnitDto;
import com.vn.ctu.qlt.dto.UnitSelection;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import com.vn.ctu.qlt.service.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * The Class SpecUnitController.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
@RequestMapping(path = "/api/spec-unit")
public class SpecUnitController {

    @Autowired
    private UnitService unitService;

    @Autowired
    private SpecUnitService specUnitService;

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/init")
    public ResponseEntity<List<UnitSelection>> init() {
        Iterable<Unit> unitsIterable = unitService.getAll();
        List<UnitSelection> unitSelections = new ArrayList<>();
        for (Unit unit : unitsIterable) {
            UnitSelection unitSelection = new UnitSelection(unit.getId(), unit.getUnitName());
            unitSelections.add(unitSelection);
        }
        return ResponseEntity.ok().body(unitSelections);
    }

    @PostMapping(path = "/save")
    public ResponseEntity<String> save(@RequestBody SpecUnitSaveDto specUnitSaveDto) {
        Unit unitIn = unitService.getUnitById(specUnitSaveDto.getUnitIn());
        Unit unitOut = unitService.getUnitById(specUnitSaveDto.getUnitOut());
        SpecUnit specUnit = new SpecUnit();
        specUnit.setUnitIn(unitIn);
        specUnit.setUnitOut(unitOut);
        specUnit.setAmount(specUnitSaveDto.getAmount());
        SpecUnit specUnitSave = specUnitService.save(specUnit);

        Product product = productService.getProductById(specUnitSaveDto.getProductId());
        List<SpecUnit> specUnits = product.getSpecUnits();
        specUnits.add(specUnitSave);
        product.setSpecUnits(specUnits);
        productService.save(product);
        return null;
    }
}
