package com.vn.ctu.qlt.dto;

import com.vn.ctu.qlt.model.SpecUnit;

/**
 * The Class SpectUnitSelectionDto.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
public class SpecUnitSelectionDto {

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

	/**
	 * Gets the value.
	 *
	 * @return the value
	 */
	public Long getValue() {
		return value;
	}

	/**
	 * Sets the value.
	 *
	 * @param value the new value
	 */
	public void setValue(Long value) {
		this.value = value;
	}

	/**
	 * Gets the label.
	 *
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * Sets the label.
	 *
	 * @param label the new label
	 */
	public void setLabel(String label) {
		this.label = label;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
