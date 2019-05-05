package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.model.Unit;

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
    Set<SpecUnitSelectionDto> getAllForSelection();

    /**
     * Gets the by id.
     *
     * @param id the id
     * @return the by id
     */
    SpecUnit getById(Long id);

    /**
     * Gets the all by selection.
     *
     * @param selection the selection
     * @return the all by selection
     */
    List<SpecUnit> getAllBySelection(Set<SpecUnitSelectionDto> selection);

    /**
     * Gets the by selection.
     *
     * @param selection the selection
     * @return the by selection
     */
    SpecUnit getBySelection(SpecUnitSelectionDto selection);

    SpecUnit save(SpecUnit specUnit);

}
