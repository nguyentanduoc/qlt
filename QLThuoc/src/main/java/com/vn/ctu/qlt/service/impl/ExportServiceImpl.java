package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.BranchSaveExport;
import com.vn.ctu.qlt.service.ExportService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ExportServiceImpl implements ExportService {

    @Override
    public void save(BranchSaveExport branchSaveExport) {

    }
}
