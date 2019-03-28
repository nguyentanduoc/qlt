package com.vn.ctu.qlt.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.vn.ctu.qlt.dto.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonSyntaxException;
import com.vn.ctu.qlt.exception.FileEmpty;
import com.vn.ctu.qlt.exception.FileStorageException;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.service.ProducerService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import com.vn.ctu.qlt.service.UnitService;

// TODO: Auto-generated Javadoc

/**
 * The Class ProductController.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
@RequestMapping("/api/product")
public class ProductController {

    /**
     * The product service.
     */
    @Autowired
    private ProductService productService;

    /**
     * The spec unit service.
     */
    @Autowired
    private SpecUnitService specUnitService;

    /**
     * The unit service.
     */
    @Autowired
    private UnitService unitService;

    /**
     * The producer service.
     */
    @Autowired
    private ProducerService producerService;

    /**
     * Inits the.
     *
     * @return the response entity
     */
    @PostMapping(path = "/init")
    public ResponseEntity<Map<String, Object>> init() {
        Map<String, Object> response = new HashMap<>();
        response.put("specUnits", specUnitService.getAllForSelection());
        response.put("units", unitService.getAllForSelection());
        response.put("producers", producerService.getAllForSelection());
        return ResponseEntity.ok().body(response);
    }

    /**
     * Save.
     *
     * @param model the model
     * @param file  the file
     * @return the response entity
     * @throws IOException Signals that an I/O exception has occurred.
     */
    @PostMapping(path = "/save")
    public ResponseEntity<Void> save(@RequestParam("model") String model,
                                     @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        try {
            if (file.isEmpty()) {
                throw new FileEmpty("Failed to store empty file");
            } else {
                productService.save(model, file);
                return new ResponseEntity<Void>(HttpStatus.OK);
            }
        } catch (IOException e) {
            String msg = String.format("Failed to store file", file.getName());
            throw new FileStorageException(msg, e.getMessage());
        } catch (JsonSyntaxException e) {
            throw e;
        }
    }

    /**
     * Gets the spec unit.
     *
     * @param id the id
     * @return the spec unit
     */
    @PostMapping(path = "/get-spec-unit")
    public ResponseEntity<Set<SpecUnitSelectionDto>> getSpecUnit(@RequestBody Long id) {
        return ResponseEntity.ok().body(productService.getSpecUnit(id));
    }

    /**
     * Gets the product for request.
     *
     * @param branchDto the branch dto
     * @return the product for request
     */
    @PostMapping(path = "/get-product-for-request")
    public ResponseEntity<List<ProductSelectionDto>> getProductForRequest(@RequestBody BranchDto branchDto) {
        List<ProductSelectionDto> body = productService.getProductForRequest(branchDto);
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(path = "/get-amount-product")
    public ResponseEntity<Double> getAmountProduct(@RequestBody Map<String, Long> request) {
        Long productId = request.get("id");
        Long branchId = request.get("branchId");
        Double result = productService.getAmountOfProduct(productId, branchId);
        return ResponseEntity.ok().body(result);
    }

    @PostMapping(path = "/get-unit-of-product")
    public ResponseEntity<UnitDto> getUnit(@RequestBody Long id) {
        Product product = productService.getProductById(id);
        Unit unit = product.getUnit();
        UnitDto dto = new UnitDto();
        BeanUtils.copyProperties(unit, dto);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping(path = "get-all-product-by-branch")
    public ResponseEntity<List<ProductOfBranchDto>> getAllProductByBranch(@RequestBody BranchDto branchDto) {
        List<ProductOfBranchDto> response = productService.getAllProductByBranch(branchDto);
		return ResponseEntity.ok().body(response);
    }
}
