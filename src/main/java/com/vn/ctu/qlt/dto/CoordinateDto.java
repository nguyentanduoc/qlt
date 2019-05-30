package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoordinateDto {
    private Double latitude;
    private Double longitude;

    @Override
    public String toString() {
        return longitude +","+latitude;
    }
}
