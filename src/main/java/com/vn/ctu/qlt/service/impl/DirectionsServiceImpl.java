package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.CoordinateDto;
import com.vn.ctu.qlt.dto.direction.DirectionSearch;
import com.vn.ctu.qlt.exception.RestemplateException;
import com.vn.ctu.qlt.service.DirectionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DirectionsServiceImpl implements DirectionsService {

    @Value("${app.mapbox_access_token}")
    private String accessToken;

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public DirectionSearch searchDirection(CoordinateDto coordinateDto, CoordinateDto coordinateBranchDto) {
        try {
            String directionResourceUrl =
                    "https://api.mapbox.com/directions/v5/mapbox/cycling/" + coordinateDto.toString() + ";" + coordinateBranchDto.toString() +
                            "?access_token=" + accessToken;
            ResponseEntity<DirectionSearch> response = restTemplate.getForEntity(directionResourceUrl, DirectionSearch.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                throw new RestemplateException(response.getStatusCode().toString());
            }
        } catch (Exception e) {
            throw new RestemplateException(e.getMessage());
        }

    }
}
