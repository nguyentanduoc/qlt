package com.vn.ctu.qlt.service.impl;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.UnitSelection;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.repository.UnitRepository;
import com.vn.ctu.qlt.service.UnitService;

@Service
@Transactional
public class UnitServiceImpl implements UnitService {

	@Autowired
	private UnitRepository unitRepository;
	
	@Override
	public Iterable<Unit> getAll() {
		return unitRepository.findAll();
	}

	@Override
	public Set<UnitSelection> getAllForSelection() {
		Set<UnitSelection> units = new HashSet<>();
		Iterable<Unit> unitIterable = getAll();
		unitIterable.forEach(unit -> {
			units.add(new UnitSelection(unit.getId(),unit.getUnitName()));
		});
		return units;
	}

	@Override
	public Unit getByUnitSeletion(UnitSelection unit) {
		return unitRepository.getOne(unit.getValue());
	}

}
