package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SmallerSpecUnitException extends RuntimeException {

	private static final long serialVersionUID = 3217563943700664126L;
	
	public SmallerSpecUnitException(String message) {
		super(message);
	}

}
