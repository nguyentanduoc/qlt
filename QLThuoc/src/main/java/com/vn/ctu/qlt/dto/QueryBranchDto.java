package com.vn.ctu.qlt.dto;

public class QueryBranchDto {

	private Long idDirector;
	
	private PageableDto pageable;

	public Long getIdDirector() {
		return idDirector;
	}

	public void setIdDirector(Long idDirector) {
		this.idDirector = idDirector;
	}

	public PageableDto getPageable() {
		return pageable;
	}

	public void setPageable(PageableDto pageable) {
		this.pageable = pageable;
	}

}
