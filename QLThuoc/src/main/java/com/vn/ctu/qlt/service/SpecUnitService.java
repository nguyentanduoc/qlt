package com.vn.ctu.qlt.service;

import java.util.Set;

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
	public Set<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection);

}
