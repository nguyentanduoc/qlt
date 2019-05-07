package com.vn.ctu.qlt.service.impl;

import java.util.*;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.dto.ProductEditRequestDto;
import com.vn.ctu.qlt.dto.UnitDto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.UnitSelection;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.repository.UnitRepository;
import com.vn.ctu.qlt.service.UnitService;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@Transactional
public class UnitServiceImpl implements UnitService {

    @Autowired
    private UnitRepository unitRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Iterable<Unit> getAll() {
        return unitRepository.findAll();
    }

    @Override
    public Set<UnitSelection> getAllForSelection() {
        Set<UnitSelection> units = new HashSet<>();
        Iterable<Unit> unitIterable = getAll();
        unitIterable.forEach(unit -> {
            units.add(new UnitSelection(unit.getId(), unit.getUnitName()));
        });
        return units;
    }

    @Override
    public Unit getByUnitSeletion(UnitSelection unit) {
        return unitRepository.getOne(unit.getValue());
    }

    @Override
    public Unit getUnitById(Long id) {
        Optional<Unit> unit = unitRepository.findById(id);
        if (!unit.isPresent()) throw new BadRequestException("Đơn vị không tồn tại");
        return unit.get();
    }

    @Override
    public List<UnitDto> getUnitDtoAll() {
        List<UnitDto> unitsDto = new ArrayList<>();
        Iterable<Unit> units = getAll();
        for (Unit unit : units) {
            unitsDto.add(modelMapper.map(unit, UnitDto.class));
        }
        return unitsDto;
    }
}
