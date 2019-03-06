package com.vn.ctu.qlt.dto;

import java.io.Serializable;

/**
 * The Class SelectionDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
public class SelectionDto implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -60108939071150557L;
	
	/** The value. */
	private Long value;
	
	/** The label. */
	private String label;

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
}
