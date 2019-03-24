package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * The Class Employee.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name="nhan_vien")
public class Employee implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7619955847999715240L;
	
	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;
	
	/** The user. */
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_tai_khoan")
	private User user;
	
	/** The name employee. */
	@Column(name="ten_nhan_vien")
	private String nameEmployee;
	
	/** The birth day. */
	@Column(name="ngay_sinh")
	private Date birthDay;
	
	/** The number phone. */
	@Column(name="so_dien_thoai")
	private String numberPhone;
	
	/** The address. */
	@Column(name="dia_chi")
	private String address;
	
	/** The branchs. */
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "nhan_vien_chi_nhanh", 
		joinColumns = @JoinColumn(name = "ma_nhan_vien"), 
		inverseJoinColumns = @JoinColumn(name = "ma_chi_nhanh"))
	@JsonIgnore
	private Set<Branch> branchs;

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
	 * Gets the user.
	 *
	 * @return the user
	 */
	public User getUser() {
		return user;
	}

	/**
	 * Sets the user.
	 *
	 * @param user the new user
	 */
	public void setUser(User user) {
		this.user = user;
	}

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
	public static long getSerialversionuid() {
		return serialVersionUID;
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
	 * Gets the birth day.
	 *
	 * @return the birth day
	 */
	public Date getBirthDay() {
		return birthDay;
	}

	/**
	 * Sets the birth day.
	 *
	 * @param birthDay the new birth day
	 */
	public void setBirthDay(Date birthDay) {
		this.birthDay = birthDay;
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
	 * Gets the branchs.
	 *
	 * @return the branchs
	 */
	public Set<Branch> getBranchs() {
		return branchs;
	}

	/**
	 * Sets the branchs.
	 *
	 * @param branchs the new branchs
	 */
	public void setBranchs(Set<Branch> branchs) {
		this.branchs = branchs;
	}

}
