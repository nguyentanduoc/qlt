package com.vn.ctu.qlt.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class UnitDto implements Serializable {

	private static final long serialVersionUID = 2771239320622990839L;

	private Long id;

	private String unitName;
}
