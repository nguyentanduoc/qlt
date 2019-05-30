package com.vn.ctu.qlt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * The Class FileNotFoundException.
 * @author ntduoc
 * @since 2019-03-13
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class FileNotFoundException extends RuntimeException {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7945844053240621832L;
	
	/** The message exception. */
	private String messageException;
	
	/**
	 * Instantiates a new file not found exception.
	 *
	 * @param message the message
	 */
	public FileNotFoundException(String message) {
		super(message);
	}
	
	/**
	 * Instantiates a new file not found exception.
	 *
	 * @param message the message
	 * @param messageException the message exception
	 */
	public FileNotFoundException(String message, String messageException) {
		super(message);
		this.messageException = messageException;
	}

	/**
	 * Gets the message exception.
	 *
	 * @return the message exception
	 */
	public String getMessageException() {
		return messageException;
	}

	/**
	 * Sets the message exception.
	 *
	 * @param messageException the new message exception
	 */
	public void setMessageException(String messageException) {
		this.messageException = messageException;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	

}
