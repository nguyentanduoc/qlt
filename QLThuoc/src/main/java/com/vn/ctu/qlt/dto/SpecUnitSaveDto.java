package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecUnitSaveDto {

    private Long unitIn;
    private Long unitOut;
    private Long productId;
    private Integer amount;
}
