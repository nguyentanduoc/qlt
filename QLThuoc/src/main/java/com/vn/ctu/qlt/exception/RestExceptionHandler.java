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
	protected ResponseEntity<ApiError> BadCredentialsException(BadCredentialsException ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage("Sai tên tài khoản hoặc mật khẩu!");
		return new ResponseEntity<ApiError>(apiError, apiError.getStatus());
	}
	
	@ExceptionHandler(value = {UsernameNotFoundException.class})
	protected ResponseEntity<ApiError> NotFound(Exception ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage(ex.getMessage());
		return new ResponseEntity<ApiError>(apiError, apiError.getStatus());
	}
	
	@ExceptionHandler(value = {DataIntegrityViolationException.class})
	protected ResponseEntity<ApiError> duplicateData(Exception ex) {
		ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST);
		apiError.setMessage("Dữ liệu đã tồn tại");
		return new ResponseEntity<ApiError>(apiError, apiError.getStatus());
	}
}
