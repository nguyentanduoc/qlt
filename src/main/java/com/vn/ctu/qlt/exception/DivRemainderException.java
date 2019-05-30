package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DivRemainderException extends RuntimeException {

	private static final long serialVersionUID = -5577831981748393267L;
	
	public DivRemainderException(String message) {
		super(message);
	}
}
