package com.vn.ctu.qlt.dto.direction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Leg {
    private String summary;
    private Double weight;
    private Double duration;
    private Double distance;
}
