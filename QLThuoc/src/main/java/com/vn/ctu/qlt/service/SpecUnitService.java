package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.SpecUnitDto;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.model.SpecUnit;

/**
 * The Interface SpecUnitService.
 */
/**
 * @author ntduoc
 * @since 2019-03-13
 */
public interface SpecUnitService {

	/**
	 * Gets the all for selection.
	 *
	 * @return the all for selection
	 */
	public Set<SpecUnitSelectionDto> getAllForSelection();
	
	/**
	 * Gets the by id.
	 *
	 * @param id the id
	 * @return the by id
	 */
	public SpecUnit getById(Long id);
	
	/**
	 * Gets the all by selection.
	 *
	 * @param selection the selection
	 * @return the all by selection
	 */
	public List<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection);
	
	/**
	 * Gets the by selection.
	 *
	 * @param selection the selection
	 * @return the by selection
	 */
	public SpecUnit getBySelection(SpecUnitSelectionDto selection);

    List<SpecUnit> getAllByListId(List<Long> ids);

    List<SpecUnitDto> getAllSpecUnitDto();

}
