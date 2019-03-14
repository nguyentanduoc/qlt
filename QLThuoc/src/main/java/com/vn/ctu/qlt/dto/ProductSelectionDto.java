package com.vn.ctu.qlt.dto;

/**
 * The Class ProductSelectionDto.
 *
 * @author ntduoc
 * @since 2019-03-12
 */
public class ProductSelectionDto extends SelectionDto {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 8166362261660989329L;
	
	/**
	 * Instantiates a new product selection dto.
	 *
	 * @param value the value
	 * @param label the label
	 */
	public ProductSelectionDto(Long value, String label) {
		super(value, label);
	}
	
	/**
	 * Instantiates a new product selection dto.
	 */
	public ProductSelectionDto() {
		super();
	}
}
