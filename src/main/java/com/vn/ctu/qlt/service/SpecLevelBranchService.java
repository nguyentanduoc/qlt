package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.SpecLevelBranchDto;
import com.vn.ctu.qlt.model.SpecLevelBranch;

import java.util.List;
import java.util.Optional;

public interface SpecLevelBranchService {
    void save(SpecLevelBranchDto specLevelBranchDto);
    List<SpecLevelBranchDto> getAll();
    List<SpecLevelBranchDto> getAllByShop();
    Optional<SpecLevelBranch> getById(Long id);
    void deleteSpecLevelBranch(Long id);
}
