package com.vn.ctu.qlt.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.vn.ctu.qlt.payload.ApiError;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(value = {BadCredentialsException.class})
	public ResponseEntity<ApiError> badCredentialsException(BadCredentialsException ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage("Sai tên tài khoản hoặc mật khẩu!");
		apiError.setDebugMessage(ex.getMessage());
		return ResponseEntity.badRequest().body(apiError);
	}
	
	@ExceptionHandler(value = {UsernameNotFoundException.class})
	public ResponseEntity<ApiError> notFound(Exception ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage(ex.getMessage());
		return ResponseEntity.badRequest().body(apiError);
	}
	
	@ExceptionHandler(value = {DataIntegrityViolationException.class})
	public ResponseEntity<ApiError> duplicateData(Exception ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage(ex.getMessage());
		return ResponseEntity.badRequest().body(apiError);
	}

	@ExceptionHandler(value = AssertionError.class)
	public ResponseEntity<ApiError> assertionError(Exception ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage(ex.getMessage());
		return ResponseEntity.badRequest().body(apiError);
	}
}
