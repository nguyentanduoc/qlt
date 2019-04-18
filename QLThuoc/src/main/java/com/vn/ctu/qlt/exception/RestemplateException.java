package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class RestemplateException extends RuntimeException {
    private static final long serialVersionUID = -3290574858383277149L;
    private String message;

    public RestemplateException(String message) {
        this.message = message;
    }
}
