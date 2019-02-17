package com.vn.ctu.qlt.helper;

import java.io.Serializable;

import org.springframework.data.domain.Sort;

public class Pageable implements org.springframework.data.domain.Pageable, Serializable {

	private static final long serialVersionUID = 4123354629949269179L;

	private int limit;
	private int offset;
	private Sort sort;

	public Pageable(int limit, int offset, Sort sort) {
		super();
		this.limit = limit;
		this.offset = offset;
		this.sort = sort;
	}

	@Override
	public int getPageNumber() {
		return 0;
	}

	@Override
	public int getPageSize() {
		return limit;
	}

	@Override
	public long getOffset() {
		return offset;
	}

	@Override
	public Sort getSort() {
		return sort;
	}

	@Override
	public org.springframework.data.domain.Pageable next() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public org.springframework.data.domain.Pageable previousOrFirst() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public org.springframework.data.domain.Pageable first() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean hasPrevious() {
		// TODO Auto-generated method stub
		return false;
	}

}
