package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.ProductAndLocationDto;
import com.vn.ctu.qlt.dto.ProductSelectionDto;
import com.vn.ctu.qlt.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/mobile-search")
public class SearchMobileController {

    @Autowired
    private ProductService productService;

    @PostMapping(path = "/search-key-word")
    public ResponseEntity<List<ProductSelectionDto>> searchProductKeyWord(@RequestBody String keyWord) {
        String searchKeyWord = keyWord.replaceAll("=", "");
        return ResponseEntity.ok().body(productService.searchProductByKeyWord(searchKeyWord));
    }

    @PostMapping(path = "/search-product-of-branch")
    public ResponseEntity<List<BranchDto>> searchProductOfBranch(@RequestBody ProductAndLocationDto productAndLocation) {
        List<BranchDto> branchesDto = productService.searchBranchHasProduct(productAndLocation);
        return ResponseEntity.ok().body(branchesDto);
    }
}
