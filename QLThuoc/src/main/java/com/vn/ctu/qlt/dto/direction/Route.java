package com.vn.ctu.qlt.dto.direction;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Route {

    private String geometry;
    private String weight_name;
    private Double weight;
    private Double duration;
    private Double distance;
    private List<Leg> legs;
}
