package com.vn.ctu.qlt.dto;

import java.io.Serializable;

import com.vn.ctu.qlt.model.SpecUnit;

import lombok.Data;

/**
 * The Class SpectUnitSelectionDto.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Data
public class SpecUnitSelectionDto implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1850806046481045442L;

	/** The value. */
	private Long value;

	/** The label. */
	private String label;

	/**
	 * Instantiates a new spect unit selection dto.
	 *
	 * @param value the value
	 * @param label the label
	 */

	public SpecUnitSelectionDto(Long value, String label) {
		this.value = value;
		this.label = label;
	}

	/**
	 * Instantiates a new spec unit selection dto.
	 */
	public SpecUnitSelectionDto() {
		super();
	}

	/**
	 * Instantiates a new spec unit selection dto.
	 *
	 * @param specUnit the spec unit
	 */
	public SpecUnitSelectionDto(SpecUnit specUnit) {
		StringBuilder lable = new StringBuilder();
		lable.append(specUnit.getUnitIn().getUnitName()).append(" ");
		lable.append(specUnit.getAmount()).append(" ");
		lable.append(specUnit.getUnitOut().getUnitName()).append(" ");
		this.value = specUnit.getId();
		this.label = lable.toString();
	}

}
