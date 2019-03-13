package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class FileEmpty extends RuntimeException{

	private static final long serialVersionUID = 9103617739368835209L;
	
	public FileEmpty(String message) {
		super(message);
	}

}
