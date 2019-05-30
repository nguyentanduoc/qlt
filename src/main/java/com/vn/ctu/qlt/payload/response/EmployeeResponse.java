package com.vn.ctu.qlt.payload.response;

/**
 * The Class EmployeeResponse.
 *
 * @author ntduoc
 * @since 2019-03-14
 */
public class EmployeeResponse extends DateAuditResponse {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -6539660265832649578L;

	/** The id. */
	private Long id;

	/** The name employee. */
	private String nameEmployee;

	/** The number phone. */
	private String numberPhone;

	/** The address. */
	private String address;

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the name employee.
	 *
	 * @return the name employee
	 */
	public String getNameEmployee() {
		return nameEmployee;
	}

	/**
	 * Sets the name employee.
	 *
	 * @param nameEmployee the new name employee
	 */
	public void setNameEmployee(String nameEmployee) {
		this.nameEmployee = nameEmployee;
	}

	/**
	 * Gets the number phone.
	 *
	 * @return the number phone
	 */
	public String getNumberPhone() {
		return numberPhone;
	}

	/**
	 * Sets the number phone.
	 *
	 * @param numberPhone the new number phone
	 */
	public void setNumberPhone(String numberPhone) {
		this.numberPhone = numberPhone;
	}

	/**
	 * Gets the address.
	 *
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * Sets the address.
	 *
	 * @param address the new address
	 */
	public void setAddress(String address) {
		this.address = address;
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
