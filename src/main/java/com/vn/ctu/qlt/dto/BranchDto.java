package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class BranchDto {

    private Long id;

    private String name;

    private Double longitude;

    private Double latitude;

    private String address;

    private Boolean isEnabled;

    private Long idDirector;

    private Boolean isMain;

    private SpecLevelBranchDtoSelection specLevelBranch;

    private ShopDto shop;

    private Double distance;
}
