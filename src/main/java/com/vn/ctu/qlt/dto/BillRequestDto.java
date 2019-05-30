package com.vn.ctu.qlt.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BillRequestDto implements Serializable {

	private static final long serialVersionUID = -5140541727577617752L;

	private Long id;

	private String employeeRequest;

	private String employeeAccept;

	private String branch;

	private Date dateRequested;

	private Date dateExchanged;

	private Boolean isSeen;

	private Boolean isReceive;

	private String noteRequest;

	private String noteExchange;

	private Boolean isAccept;
	
	private Boolean isCancel;

	private Boolean isDone;

}
