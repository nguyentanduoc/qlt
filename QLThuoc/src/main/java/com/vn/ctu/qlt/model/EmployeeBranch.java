package com.vn.ctu.qlt.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * The Class EmployeeBranch.
 *
 * @author ntduoc
 * @since 2019-03-14
 */
public class EmployeeBranch implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 2367712262995419597L;

	/** The id. */
	@EmbeddedId
	private EmployeeBranchId id;

	/** The employee. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_nhan_vien")
	private Employee employee;

	/** The branch. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_chi_nhanh")
	private Branch branch;

	/** The date join. */
	@Column(name = "nay_vao")
	private Date dateJoin;

	/** The is enable. */
	@Column(name = "hoat_dong")
	private Boolean isEnable;

	/**
	 * Instantiates a new employee branch.
	 */
	public EmployeeBranch() {
		super();
	}

	/**
	 * Instantiates a new employee branch.
	 *
	 * @param employee the employee
	 * @param branch   the branch
	 */
	public EmployeeBranch(Employee employee, Branch branch) {
		super();
		this.employee = employee;
		this.branch = branch;
		this.id = new EmployeeBranchId(employee.getId(), branch.getId());
	}

	/**
	 * Gets the employee.
	 *
	 * @return the employee
	 */
	public Employee getEmployee() {
		return employee;
	}

	/**
	 * Sets the employee.
	 *
	 * @param employee the new employee
	 */
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	/**
	 * Gets the branch.
	 *
	 * @return the branch
	 */
	public Branch getBranch() {
		return branch;
	}

	/**
	 * Sets the branch.
	 *
	 * @param branch the new branch
	 */
	public void setBranch(Branch branch) {
		this.branch = branch;
	}

	/**
	 * Gets the date join.
	 *
	 * @return the date join
	 */
	public Date getDateJoin() {
		return dateJoin;
	}

	/**
	 * Sets the date join.
	 *
	 * @param dateJoin the new date join
	 */
	public void setDateJoin(Date dateJoin) {
		this.dateJoin = dateJoin;
	}

	/**
	 * Gets the checks if is enable.
	 *
	 * @return the checks if is enable
	 */
	public Boolean getIsEnable() {
		return isEnable;
	}

	/**
	 * Sets the checks if is enable.
	 *
	 * @param isEnable the new checks if is enable
	 */
	public void setIsEnable(Boolean isEnable) {
		this.isEnable = isEnable;
	}

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public EmployeeBranchId getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(EmployeeBranchId id) {
		this.id = id;
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
		result = prime * result + ((branch == null) ? 0 : branch.hashCode());
		result = prime * result + ((dateJoin == null) ? 0 : dateJoin.hashCode());
		result = prime * result + ((employee == null) ? 0 : employee.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((isEnable == null) ? 0 : isEnable.hashCode());
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
		EmployeeBranch other = (EmployeeBranch) obj;
		if (branch == null) {
			if (other.branch != null)
				return false;
		} else if (!branch.equals(other.branch))
			return false;
		if (dateJoin == null) {
			if (other.dateJoin != null)
				return false;
		} else if (!dateJoin.equals(other.dateJoin))
			return false;
		if (employee == null) {
			if (other.employee != null)
				return false;
		} else if (!employee.equals(other.employee))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (isEnable == null) {
			if (other.isEnable != null)
				return false;
		} else if (!isEnable.equals(other.isEnable))
			return false;
		return true;
	}

}
