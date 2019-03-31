package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.List;

@Data
public class BranchSaveExport {
    private BranchDto branch;
    private List<SaveExportDto> dataSubmits;
}
