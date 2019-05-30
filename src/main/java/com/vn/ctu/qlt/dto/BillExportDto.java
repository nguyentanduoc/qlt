package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillExportDto {

    private Long id;

    private EmployeeDto employee;

    private BranchDto branch;

    private Date dateCreated;

    private Boolean isShare;
}
