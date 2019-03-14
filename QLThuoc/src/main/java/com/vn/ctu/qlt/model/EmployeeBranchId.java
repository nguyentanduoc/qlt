package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 * The Class EmployeeBranchId.
 *
 * @author ntduoc
 * @since 2019-03-14
 */
@Embeddable
public class EmployeeBranchId implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 8615809151734309939L;

	/** The employee id. */
	@Column(name = "nhan_vien_id")
	private Long employeeId;

	/** The branch id. */
	@Column(name = "chi_nhanh_id")
	private Long branchId;

	/**
	 * Instantiates a new employee branch id.
	 */
	public EmployeeBranchId() {
		super();
	}

	/**
	 * Instantiates a new employee branch id.
	 *
	 * @param employeeId the employee id
	 * @param branchId   the branch id
	 */
	public EmployeeBranchId(Long employeeId, Long branchId) {
		super();
		this.employeeId = employeeId;
		this.branchId = branchId;
	}

	/**
	 * Gets the employee id.
	 *
	 * @return the employee id
	 */
	public Long getEmployeeId() {
		return employeeId;
	}

	/**
	 * Sets the employee id.
	 *
	 * @param employeeId the new employee id
	 */
	public void setEmployeeId(Long employeeId) {
		this.employeeId = employeeId;
	}

	/**
	 * Gets the branch id.
	 *
	 * @return the branch id
	 */
	public Long getBranchId() {
		return branchId;
	}

	/**
	 * Sets the branch id.
	 *
	 * @param branchId the new branch id
	 */
	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#hashCode()
	 */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((branchId == null) ? 0 : branchId.hashCode());
		result = prime * result + ((employeeId == null) ? 0 : employeeId.hashCode());
		return result;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		EmployeeBranchId other = (EmployeeBranchId) obj;
		if (branchId == null) {
			if (other.branchId != null)
				return false;
		} else if (!branchId.equals(other.branchId))
			return false;
		if (employeeId == null) {
			if (other.employeeId != null)
				return false;
		} else if (!employeeId.equals(other.employeeId))
			return false;
		return true;
	}
}
