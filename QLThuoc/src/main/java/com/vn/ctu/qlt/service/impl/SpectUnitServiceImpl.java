package com.vn.ctu.qlt.service.impl;

import java.util.HashSet;
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
public class SpectUnitServiceImpl implements SpecUnitService {

	/** The spect unit repository. */
	@Autowired
	private SpecUnitRepository spectUnitRepository;

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getAllForSelection()
	 */
	@Override
	public Set<SpecUnitSelectionDto> getAllForSelection() {
		Iterable<SpecUnit> spectUnitsResult = spectUnitRepository.findAll();
		Set<SpecUnitSelectionDto> spectUnitSelectionDto = new HashSet<>();
		for (SpecUnit su : spectUnitsResult) {
			
			spectUnitSelectionDto.add(new SpecUnitSelectionDto(su));
		}
		return spectUnitSelectionDto;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getById(java.lang.Long)
	 */
	@Override
	public SpecUnit getById(Long id) {
		return spectUnitRepository.findById(id).get();
	}
	
	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.SpecUnitService#getAllBySelection(java.util.Set)
	 */
	@Override
	public Set<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection){
		Set<SpecUnit> result = new HashSet<SpecUnit>();
		for(SpecUnitSelectionDto susd: selection) {
			result.add(getById(susd.getValue()));
		}
		return result;
	}

}
