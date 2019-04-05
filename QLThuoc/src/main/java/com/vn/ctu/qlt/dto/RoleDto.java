package com.vn.ctu.qlt.dto;

import com.vn.ctu.qlt.model.RoleName;
import lombok.Data;

@Data
public class RoleDto {
    private Long id;

    private RoleName name;

    private String detail;

    private Integer level;
}
