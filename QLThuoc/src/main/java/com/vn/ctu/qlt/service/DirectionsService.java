package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.CoordinateDto;
import com.vn.ctu.qlt.dto.direction.DirectionSearch;

public interface DirectionsService {

    DirectionSearch searchDirection(CoordinateDto coordinateDto, CoordinateDto coordinateShopDto);
}
