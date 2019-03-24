package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NullRequestException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3822070384932217556L;

	public NullRequestException(String message) {
		super(message);
	}

}
