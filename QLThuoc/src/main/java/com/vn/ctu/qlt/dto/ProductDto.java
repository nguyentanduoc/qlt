package com.vn.ctu.qlt.dto;

import java.util.Set;

/**
 * The Class ProductDto.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
public class ProductDto {

	/** The id. */
	private Long id;
	
	/** The product name. */
	private String productName;
	
	/** The virtue. */
	private String virtue;
	
	/** The spec units. */
	private Set<SpecUnitSelectionDto> specUnits;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the product name.
	 *
	 * @return the product name
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * Sets the product name.
	 *
	 * @param productName the new product name
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * Gets the virtue.
	 *
	 * @return the virtue
	 */
	public String getVirtue() {
		return virtue;
	}

	/**
	 * Sets the virtue.
	 *
	 * @param virtue the new virtue
	 */
	public void setVirtue(String virtue) {
		this.virtue = virtue;
	}

	/**
	 * Gets the spec units.
	 *
	 * @return the spec units
	 */
	public Set<SpecUnitSelectionDto> getSpecUnits() {
		return specUnits;
	}

	/**
	 * Sets the spec units.
	 *
	 * @param specUnits the new spec units
	 */
	public void setSpecUnits(Set<SpecUnitSelectionDto> specUnits) {
		this.specUnits = specUnits;
	}

}
