package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.List;
import java.util.Set;

/**
 * The Class ProductDto.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Data
public class ProductDto {

	/** The id. */
	private Long id;

	/** The product name. */
	private String productName;

	/** The virtue. */
	private String virtue;

	/** The spec units. */
	private Set<SpecUnitSelectionDto> specUnits;

	/** The unit. */
	private UnitSelection unit;

	/** The producer. */
	private ProducerDto producer;

	private ProducerSeletion producerSeletion;

	private List<ProductOfBranchDto> productsOfBranch;

}
