package com.vn.ctu.qlt.model;

import java.util.Date;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cua_hang", uniqueConstraints = { @UniqueConstraint(columnNames = { "ten_cua_hang" }) })
public class Shop extends DateAudit {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "ten_cua_hang")
	private String nameShop;

	@Column(name = "ngay_thanh_lap")
	private Date establishAt;

	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_nhan_vien")
	private Employee employee;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "id")
	private Set<Branch> branchs;

	@Generated("SparkTools")
	private Shop(Builder builder) {
		this.id = builder.id;
		this.nameShop = builder.nameShop;
		this.establishAt = builder.establishAt;
		this.isEnabled = builder.isEnabled;
		this.setCreatedAt(builder.createAt);
		this.setUpdatedAt(builder.updateAt);
		this.employee = builder.employee;
	}

	public Long getId() {
		return id;
	}

	public Shop() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameShop() {
		return nameShop;
	}

	public void setNameShop(String nameShop) {
		this.nameShop = nameShop;
	}

	public Date getEstablishAt() {
		return establishAt;
	}

	public void setEstablishAt(Date establishAt) {
		this.establishAt = establishAt;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Set<Branch> getBranchs() {
		return branchs;
	}

	public void setBranchs(Set<Branch> branchs) {
		this.branchs = branchs;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	/**
	 * Creates builder to build {@link Shop}.
	 * 
	 * @return created builder
	 */
	@Generated("SparkTools")
	public static Builder builder() {
		return new Builder();
	}

	/**
	 * Builder to build {@link Shop}.
	 */
	@Generated("SparkTools")
	public static final class Builder {
		private Long id;
		private String nameShop;
		private Date establishAt;
		private Boolean isEnabled;
		private Date createAt;
		private Date updateAt;
		private Employee employee;

		private Builder() {
		}

		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		public Builder withNameShop(String nameShop) {
			this.nameShop = nameShop;
			return this;
		}

		public Builder withEstablishAt(Date establishAt) {
			this.establishAt = establishAt;
			return this;
		}

		public Builder withIsEnabled(Boolean isEnabled) {
			this.isEnabled = isEnabled;
			return this;
		}

		public Builder withCreateAt(Date createAt) {
			this.createAt = createAt;
			return this;
		}

		public Builder withUpdateAt(Date updateAt) {
			this.updateAt = updateAt;
			return this;
		}

		public Builder withEmployye(Employee employee) {
			this.employee = employee;
			return this;
		}

		public Shop build() {
			return new Shop(this);
		}
	}
	
}
