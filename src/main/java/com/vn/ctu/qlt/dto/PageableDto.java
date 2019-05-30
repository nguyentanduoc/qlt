package com.vn.ctu.qlt.dto;

import java.io.Serializable;

import lombok.Data;

@Data
public class PageableDto implements Serializable {

	private static final long serialVersionUID = 2506665316224284197L;

	private int page;

	private int size;

	private String sort;

}