package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.Date;
import java.util.Set;

@Data
public class EmployeeDtoLeaderSave {


    /** The id. */
    private Long id;

    /** The name employee. */
    private String nameEmployee;

    /** The birth day. */
    private Date birthDay;

    /** The number phone. */
    private String numberPhone;

    /** The address. */
    private String address;

    /** The username. */
    private String username;

    /** The date join. */
    private Date dateJoin;

    private BranchDto branch;

    /** The roles. */
    private Set<RoleSeletionDto> roles;
}
