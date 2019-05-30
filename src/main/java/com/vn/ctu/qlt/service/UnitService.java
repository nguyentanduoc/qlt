package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.UnitDto;
import com.vn.ctu.qlt.dto.UnitSelection;
import com.vn.ctu.qlt.model.Unit;

public interface UnitService {

    public Iterable<Unit> getAll();

    public Set<UnitSelection> getAllForSelection();

    public Unit getByUnitSeletion(UnitSelection unit);

    public Unit getUnitById(Long id);

    public List<UnitDto> getUnitDtoAll();

    void save(Unit unit);

    List<Unit> getByName(String name);
}
