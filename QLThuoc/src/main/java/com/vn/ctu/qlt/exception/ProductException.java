package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProductException extends RuntimeException {

	private static final long serialVersionUID = 6618193348510821329L;
	
	public ProductException(String message) {
		super(message);
	}

}
