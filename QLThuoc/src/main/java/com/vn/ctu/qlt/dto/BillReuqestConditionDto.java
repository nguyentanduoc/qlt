package com.vn.ctu.qlt.dto;

import lombok.Data;

@Data
public class BillReuqestConditionDto {

	private Boolean isSeen;

	private Boolean isReceive;

	private Boolean isAccept;

	private Boolean isDone;
	
	private Boolean isCancel;
}
