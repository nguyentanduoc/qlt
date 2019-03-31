package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.SpecLevelBranchDto;
import com.vn.ctu.qlt.model.SpecLevelBranch;

import java.util.List;
import java.util.Optional;

public interface SpecLevelBranchService {
    public void save(SpecLevelBranchDto specLevelBranchDto);
    public List<SpecLevelBranchDto> getAll();
    public List<SpecLevelBranchDto> getAllByShop();
    public Optional<SpecLevelBranch> getById(Long id);
}
