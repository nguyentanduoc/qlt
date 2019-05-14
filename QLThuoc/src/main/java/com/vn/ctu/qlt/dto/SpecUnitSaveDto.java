package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpecUnitSaveDto {

    private Long productId;

    private List<Long> specUnits;
}
