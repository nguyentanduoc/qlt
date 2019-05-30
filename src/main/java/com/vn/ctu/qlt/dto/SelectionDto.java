package com.vn.ctu.qlt.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * The Class SelectionDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SelectionDto implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -60108939071150557L;

	/** The value. */
	private Long value;

	/** The label. */
	private String label;

}
