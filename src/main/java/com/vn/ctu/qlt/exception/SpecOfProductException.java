package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SpecOfProductException extends RuntimeException {

	private static final long serialVersionUID = -1368386663511195566L;
	
	public SpecOfProductException(String message) {
		super(message);
	}

}
