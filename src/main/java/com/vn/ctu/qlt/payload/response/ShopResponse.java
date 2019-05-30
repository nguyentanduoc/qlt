package com.vn.ctu.qlt.payload.response;

import java.util.Date;

/**
 * The Class ShopResponse.
 *
 * @author ntduoc
 * @since 2019-03-14
 */
public class ShopResponse extends DateAuditResponse {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7377605416379439712L;

	/** The id. */
	private Long id;

	/** The name shop. */
	private String nameShop;

	/** The establish at. */
	private Date establishAt;

	/** The is enabled. */
	private Boolean isEnabled;

	/** The employee. */
	private EmployeeResponse employee;

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
	 * Gets the name shop.
	 *
	 * @return the name shop
	 */
	public String getNameShop() {
		return nameShop;
	}

	/**
	 * Sets the name shop.
	 *
	 * @param nameShop the new name shop
	 */
	public void setNameShop(String nameShop) {
		this.nameShop = nameShop;
	}

	/**
	 * Gets the establish at.
	 *
	 * @return the establish at
	 */
	public Date getEstablishAt() {
		return establishAt;
	}

	/**
	 * Sets the establish at.
	 *
	 * @param establishAt the new establish at
	 */
	public void setEstablishAt(Date establishAt) {
		this.establishAt = establishAt;
	}

	/**
	 * Gets the checks if is enabled.
	 *
	 * @return the checks if is enabled
	 */
	public Boolean getIsEnabled() {
		return isEnabled;
	}

	/**
	 * Sets the checks if is enabled.
	 *
	 * @param isEnabled the new checks if is enabled
	 */
	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	/**
	 * Gets the employee.
	 *
	 * @return the employee
	 */
	public EmployeeResponse getEmployee() {
		return employee;
	}

	/**
	 * Sets the employee.
	 *
	 * @param employee the new employee
	 */
	public void setEmployee(EmployeeResponse employee) {
		this.employee = employee;
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
