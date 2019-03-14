package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Branch.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "chi_nhanh")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Branch implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 6646370807108789380L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The name. */
	@NotBlank
	@Size(max = 100)
	@Column(name = "ten_chi_nhanh")
	private String name;

	/** The longitude. */
	@Column(name = "kinh_do")
	private Double longitude;

	/** The latitude. */
	@Column(name = "vi_do")
	private Double latitude;

	/** The address. */
	@Column(name = "dia_chi")
	private String address;

	/** The is enabled. */
	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	/** The shop. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cua_hang_id")
	private Shop shop;
	
	/**
	 * Instantiates a new branch.
	 *
	 * @param builder the builder
	 */
	@Generated("SparkTools")
	private Branch(Builder builder) {
		this.id = builder.id;
		this.name = builder.name;
		this.longitude = builder.longitude;
		this.latitude = builder.latitude;
		this.address = builder.address;
		this.isEnabled = builder.isEnabled;
		this.shop = builder.shop;
	}

	/**
	 * Instantiates a new branch.
	 */
	public Branch() {
		super();
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
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the longitude.
	 *
	 * @return the longitude
	 */
	public Double getLongitude() {
		return longitude;
	}

	/**
	 * Sets the longitude.
	 *
	 * @param longitude the new longitude
	 */
	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	/**
	 * Gets the latitude.
	 *
	 * @return the latitude
	 */
	public Double getLatitude() {
		return latitude;
	}

	/**
	 * Sets the latitude.
	 *
	 * @param latitude the new latitude
	 */
	public void setLatitude(Double latitude) {
		this.latitude = latitude;
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
	 * Creates builder to build {@link Branch}.
	 * 
	 * @return created builder
	 */
	@Generated("SparkTools")
	public static Builder builder() {
		return new Builder();
	}

	/**
	 * Builder to build {@link Branch}.
	 */
	@Generated("SparkTools")
	public static final class Builder {
		
		/** The id. */
		private Long id;
		
		/** The name. */
		private String name;
		
		/** The longitude. */
		private Double longitude;
		
		/** The latitude. */
		private Double latitude;
		
		/** The address. */
		private String address;
		
		/** The is enabled. */
		private Boolean isEnabled;
		
		/** The shop. */
		private Shop shop;

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
		 * With name.
		 *
		 * @param name the name
		 * @return the builder
		 */
		public Builder withName(String name) {
			this.name = name;
			return this;
		}

		/**
		 * With longitude.
		 *
		 * @param longitude the longitude
		 * @return the builder
		 */
		public Builder withLongitude(Double longitude) {
			this.longitude = longitude;
			return this;
		}

		/**
		 * With latitude.
		 *
		 * @param latitude the latitude
		 * @return the builder
		 */
		public Builder withLatitude(Double latitude) {
			this.latitude = latitude;
			return this;
		}

		/**
		 * With address.
		 *
		 * @param address the address
		 * @return the builder
		 */
		public Builder withAddress(String address) {
			this.address = address;
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
		 * With shop.
		 *
		 * @param shop the shop
		 * @return the builder
		 */
		public Builder withShop(Shop shop) {
			this.shop = shop;
			return this;
		}

		/**
		 * Builds the.
		 *
		 * @return the branch
		 */
		public Branch build() {
			return new Branch(this);
		}
	}

	/**
	 * Gets the shop.
	 *
	 * @return the shop
	 */
	public Shop getShop() {
		return shop;
	}

	/**
	 * Sets the shop.
	 *
	 * @param shop the new shop
	 */
	public void setShop(Shop shop) {
		this.shop = shop;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
