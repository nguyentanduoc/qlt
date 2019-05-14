package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class BillRequestWithConditionDto {

    private BranchDto branch;

    private BillRequestConditionDto condition;
}
