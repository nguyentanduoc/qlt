package com.vn.ctu.qlt.dto;

import org.springframework.data.domain.PageRequest;

public class QueryBranchDto {

	private Long idDirector;
	
	private PageRequest pageable;

	public Long getIdDirector() {
		return idDirector;
	}

	public void setIdDirector(Long idDirector) {
		this.idDirector = idDirector;
	}

	public PageRequest getPageable() {
		return pageable;
	}

	public void setPageable(PageRequest pageable) {
		this.pageable = pageable;
	}

}
