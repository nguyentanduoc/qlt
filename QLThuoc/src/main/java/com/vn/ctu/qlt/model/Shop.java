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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Shop.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "cua_hang")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Shop extends DateAudit {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The name shop. */
	@Column(name = "ten_cua_hang")
	private String nameShop;

	/** The establish at. */
	@Column(name = "ngay_thanh_lap")
	private Date establishAt;

	/** The is enabled. */
	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	/** The employee. */
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "nhan_vien_id")
	private Employee employee;

	/** The branchs. */
	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "shop")
	private Set<Branch> branchs;

	/**
	 * Instantiates a new shop.
	 *
	 * @param builder the builder
	 */
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

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Instantiates a new shop.
	 */
	public Shop() {
		super();
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

	/**
	 * Gets the serialversionuid.
	 *
	 * @return the serialversionuid
	 */
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
		
		/** The id. */
		private Long id;
		
		/** The name shop. */
		private String nameShop;
		
		/** The establish at. */
		private Date establishAt;
		
		/** The is enabled. */
		private Boolean isEnabled;
		
		/** The create at. */
		private Date createAt;
		
		/** The update at. */
		private Date updateAt;
		
		/** The employee. */
		private Employee employee;

		/**
		 * Instantiates a new builder.
		 */
		private Builder() {
		}

		/**
		 * With id.
		 *
		 * @param id the id
		 * @return the builder
		 */
		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		/**
		 * With name shop.
		 *
		 * @param nameShop the name shop
		 * @return the builder
		 */
		public Builder withNameShop(String nameShop) {
			this.nameShop = nameShop;
			return this;
		}

		/**
		 * With establish at.
		 *
		 * @param establishAt the establish at
		 * @return the builder
		 */
		public Builder withEstablishAt(Date establishAt) {
			this.establishAt = establishAt;
			return this;
		}

		/**
		 * With is enabled.
		 *
		 * @param isEnabled the is enabled
		 * @return the builder
		 */
		public Builder withIsEnabled(Boolean isEnabled) {
			this.isEnabled = isEnabled;
			return this;
		}

		/**
		 * With create at.
		 *
		 * @param createAt the create at
		 * @return the builder
		 */
		public Builder withCreateAt(Date createAt) {
			this.createAt = createAt;
			return this;
		}

		/**
		 * With update at.
		 *
		 * @param updateAt the update at
		 * @return the builder
		 */
		public Builder withUpdateAt(Date updateAt) {
			this.updateAt = updateAt;
			return this;
		}

		/**
		 * With employye.
		 *
		 * @param employee the employee
		 * @return the builder
		 */
		public Builder withEmployye(Employee employee) {
			this.employee = employee;
			return this;
		}

		/**
		 * Builds the.
		 *
		 * @return the shop
		 */
		public Shop build() {
			return new Shop(this);
		}
	}
	
}
