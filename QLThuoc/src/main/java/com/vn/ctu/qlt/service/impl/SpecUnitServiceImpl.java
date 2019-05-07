package com.vn.ctu.qlt.service.impl;

import java.util.*;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.dto.SpecUnitDto;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.Unit;
import org.modelmapper.ModelMapper;
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

    @Autowired
    private ModelMapper modelMapper;

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.SpecUnitService#getAllForSelection()
     */
    @Override
    public Set<SpecUnitSelectionDto> getAllForSelection() {
        Iterable<SpecUnit> specUnitsResult = specUnitRepository.findAll();
        Set<SpecUnitSelectionDto> specUnitSelectionDto = new HashSet<>();
        for (SpecUnit su : specUnitsResult) {

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
		List<SpecUnit> result = new ArrayList<SpecUnit>();
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

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.SpecUnitService#getAllBySelection(java.util.Set)
     */
    @Override
    public List<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection) {
        List<SpecUnit> result = new ArrayList<>();
        for (SpecUnitSelectionDto susd : selection) {
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

    @Override
    public SpecUnit save(SpecUnit specUnit) {
        specUnitRepository.save(specUnit);
        return specUnit;
    }

    @Override
    public List<SpecUnit> getAllByListId(List<Long> ids) {
        List<SpecUnit> specUnits = new ArrayList<>();
        for (Long id : ids) {
            Optional<SpecUnit> optionalSpecUnit = specUnitRepository.findById(id);
            if (optionalSpecUnit.isPresent())
                specUnits.add(optionalSpecUnit.get());
        }
        return specUnits;
    }

    @Override
    public List<SpecUnitDto> getAllSpecUnitDto() {
        List<SpecUnitDto> specUnitsDto = new ArrayList<>();
        Iterable<SpecUnit> specUnitsResult = specUnitRepository.findAll();
        for (SpecUnit specUnit : specUnitsResult) {
            specUnitsDto.add(modelMapper.map(specUnit, SpecUnitDto.class));
        }
        return specUnitsDto;
    }

}
