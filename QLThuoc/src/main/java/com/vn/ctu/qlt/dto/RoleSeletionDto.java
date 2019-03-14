package com.vn.ctu.qlt.dto;

/**
 * The Class RoleSeletionDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
public class RoleSeletionDto extends SelectionDto {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7401683827090452429L;

	/**
	 * Instantiates a new role seletion dto.
	 *
	 * @param value the value
	 * @param label the label
	 */
	public RoleSeletionDto(Long value, String label) {
		super(value, label);
	}

	/**
	 * Instantiates a new role seletion dto.
	 */
	public RoleSeletionDto() {
		super();
	}

}
