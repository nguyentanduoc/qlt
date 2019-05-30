package com.vn.ctu.qlt.controller;

import com.vn.ctu.qlt.dto.SpecLevelBranchDto;
import com.vn.ctu.qlt.dto.SpecLevelBranchDtoSelection;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.SpecLevelBranch;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.SpecLevelBranchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/spec-level-branch")
public class SpecLevelBranchController {

    @Autowired
    private SpecLevelBranchService specLevelBranchService;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @PostMapping(path = "/save")
    public ResponseEntity<List<SpecLevelBranchDto>> save(@RequestBody SpecLevelBranchDto specLevelBranchDto) {
        specLevelBranchService.save(specLevelBranchDto);
        List<SpecLevelBranchDto> response = specLevelBranchService.getAllByShop();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(path = "/get-all")
    public ResponseEntity<List<SpecLevelBranchDto>> getAll() {
        List<SpecLevelBranchDto> response = specLevelBranchService.getAllByShop();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping(path = "/get-all-for-selection")
    public ResponseEntity<List<SpecLevelBranchDtoSelection>> getAllForSelection() {
        List<SpecLevelBranchDtoSelection> body = new ArrayList<>();
        List<SpecLevelBranchDto> specLevelBranchesDto = specLevelBranchService.getAllByShop();
        specLevelBranchesDto.forEach(action -> {
            SpecLevelBranchDtoSelection specLevelBranchDtoSelection = new SpecLevelBranchDtoSelection();
            specLevelBranchDtoSelection.setLabel(action.getLevelName() + " [" + action.getPercentProfit().toString() + "]");
            specLevelBranchDtoSelection.setValue(action.getId());
            body.add(specLevelBranchDtoSelection);
        });
        return ResponseEntity.ok().body(body);
    }

    @PostMapping(path = "delete-spec-level-branch")
    public ResponseEntity deleteSpecLevelBranch(@RequestBody Long id) {
        specLevelBranchService.deleteSpecLevelBranch(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
