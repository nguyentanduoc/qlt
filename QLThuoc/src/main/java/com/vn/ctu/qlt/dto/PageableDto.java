package com.vn.ctu.qlt.dto;

import java.io.Serializable;

public class PageableDto implements Serializable {

	private static final long serialVersionUID = 2506665316224284197L;

	private int page;

	private int size;

	private String sort;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

}