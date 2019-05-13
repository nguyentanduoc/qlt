package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.SpecUnitSaveDto;
import com.vn.ctu.qlt.dto.UnitSaveDto;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.dto.UnitSelection;
import com.vn.ctu.qlt.exception.BadRequestException;
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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * The Class SpecUnitController.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class SpecUnitController {

    @Autowired
    private UnitService unitService;

    @Autowired
    private SpecUnitService specUnitService;

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/init")
    public ResponseEntity<Set<SpecUnitSelectionDto>> init() {
        Set<SpecUnitSelectionDto> specUnitSelectionsDto = specUnitService.getAllForSelection();
        return ResponseEntity.ok().body(specUnitSelectionsDto);
    }

    @PostMapping(path = "/get-all-unit")
    public ResponseEntity<List<UnitSelection>> getAllUnit() {
        Iterable<Unit> unitsIterable = unitService.getAll();
        List<UnitSelection> unitSelections = new ArrayList<>();
        for (Unit unit : unitsIterable) {
            UnitSelection unitSelection = new UnitSelection(unit.getId(), unit.getUnitName());
            unitSelections.add(unitSelection);
        }
        return ResponseEntity.ok().body(unitSelections);
    }

    @PostMapping(path = "/save")
    public ResponseEntity save(@RequestBody SpecUnitSaveDto specUnitSaveDto) {
        try {
            Product product = productService.getProductById(specUnitSaveDto.getProductId());
            List<SpecUnit> specUnits = specUnitService.getAllByListId(specUnitSaveDto.getSpecUnits());
            product.getSpecUnits().addAll(specUnits);
            product.setSpecUnits(product.getSpecUnits());
            productService.save(product);
            List<SpecUnit> specUnitsProduct = product.getSpecUnits();
            Set<SpecUnitSelectionDto> specUnitsSelection = new HashSet<>();
            specUnitsProduct.forEach(action -> specUnitsSelection.add(new SpecUnitSelectionDto(action)));
            return ResponseEntity.ok().body(specUnitsSelection);
        } catch (Exception e) {
            throw new BadRequestException("Quy định đơn vị đã tồn tại");
        }
    }

    @PostMapping(path = "/save-unit")
    public ResponseEntity saveUnit(@RequestBody UnitSaveDto unitSaveDto) {
        Unit unitIn = unitService.getUnitById(unitSaveDto.getUnitIn());
        Unit unitOut = unitService.getUnitById(unitSaveDto.getUnitOut());
        SpecUnit specUnit = new SpecUnit();
        specUnit.setUnitIn(unitIn);
        specUnit.setUnitOut(unitOut);
        specUnit.setAmount(unitSaveDto.getAmount());
        try {
            specUnitService.save(specUnit);
            Set<SpecUnitSelectionDto> specUnitSelectionsDto = specUnitService.getAllForSelection();
            return ResponseEntity.ok().body(specUnitSelectionsDto);
        } catch (Exception e) {
            throw new BadRequestException("Quy định đơn vị đã tồn tại");
        }
    }

    @PostMapping(path = "/save-model-unit")
    public ResponseEntity saveModalUnit(@RequestBody String name) {
        try {
            Unit unit = new Unit();
            unit.setUnitName(name);
            unitService.save(unit);
            return ResponseEntity.ok().body(unitService.getAllForSelection());
        } catch (Exception e) {
            throw new BadRequestException("Lỗi lưu đơn vị");
        }
    }
}
