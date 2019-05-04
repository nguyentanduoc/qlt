package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.repository.SpecUnitRepository;
import com.vn.ctu.qlt.service.SpecUnitService;

/**
 * The Class SpectUnitServiceImpl.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Service
@Transactional
public class SpecUnitServiceImpl implements SpecUnitService {

	/** The spect unit repository. */
	@Autowired
	private SpecUnitRepository specUnitRepository;

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getAllForSelection()
	 */
	@Override
	public Set<SpecUnitSelectionDto> getAllForSelection() {
		Iterable<SpecUnit> specUnitsResult = specUnitRepository.findAll();
		Set<SpecUnitSelectionDto> specUnitSelectionDto = new HashSet<>();
		for (SpecUnit su : specUnitsResult) {
			
			specUnitSelectionDto.add(new SpecUnitSelectionDto(su));
		}
		return specUnitSelectionDto;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getById(java.lang.Long)
	 */
	@Override
	public SpecUnit getById(Long id) {
		return specUnitRepository.findById(id).get();
	}
	
	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getAllBySelection(java.util.Set)
	 */
	@Override
	public List<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection){
		List<SpecUnit> result = new ArrayList<>();
		for(SpecUnitSelectionDto susd: selection) {
			result.add(getById(susd.getValue()));
		}
		return result;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getBySelection(com.vn.ctu.qlt.dto.SpecUnitSelectionDto)
	 */
	@Override
	public SpecUnit getBySelection(SpecUnitSelectionDto selection) {
		return specUnitRepository.findById(selection.getValue()).get();
	}

}
