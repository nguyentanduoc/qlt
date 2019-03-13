package com.vn.ctu.qlt.exception;

/**
 * The Class FileStorageException.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
public class FileStorageException extends RuntimeException {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 2966016919188317366L;

	/** The message. */
	private String message;

	/** The exception message. */
	private String exceptionMessage;

	/**
	 * Instantiates a new file storage exception.
	 *
	 * @param message          the message
	 * @param exceptionMessage the exception message
	 */
	public FileStorageException(String message, String exceptionMessage) {
		super();
		this.message = message;
		this.exceptionMessage = exceptionMessage;
	}
	
	

	/**
	 * Instantiates a new file storage exception.
	 *
	 * @param message the message
	 * @param message2 the message 2
	 */
	public FileStorageException(String message) {
		this.message = message;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Throwable#getMessage()
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * Sets the message.
	 *
	 * @param message the new message
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	/**
	 * Gets the exception message.
	 *
	 * @return the exception message
	 */
	public String getExceptionMessage() {
		return exceptionMessage;
	}

	/**
	 * Sets the exception message.
	 *
	 * @param exceptionMessage the new exception message
	 */
	public void setExceptionMessage(String exceptionMessage) {
		this.exceptionMessage = exceptionMessage;
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
