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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "chi_nhanh", uniqueConstraints = { @UniqueConstraint(columnNames = { "ten_chi_nhanh " }) })
public class Branch implements Serializable {

	private static final long serialVersionUID = 6646370807108789380L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	@Column(name = "ten_chi_nhanh")
	private String name;

	@Column(name = "kinh_do")
	private Double longitude;

	@Column(name = "vi_do")
	private Double latitude;

	@Column(name = "dia_chi")
	private String address;

	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_cua_hang")
	@JsonIgnore
	private Shop shop;

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

	public Branch() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

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
		private Long id;
		private String name;
		private Double longitude;
		private Double latitude;
		private String address;
		private Boolean isEnabled;
		private Shop shop;

		private Builder() {
		}

		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		public Builder withName(String name) {
			this.name = name;
			return this;
		}

		public Builder withLongitude(Double longitude) {
			this.longitude = longitude;
			return this;
		}

		public Builder withLatitude(Double latitude) {
			this.latitude = latitude;
			return this;
		}

		public Builder withAddress(String address) {
			this.address = address;
			return this;
		}

		public Builder withIsEnabled(Boolean isEnabled) {
			this.isEnabled = isEnabled;
			return this;
		}

		public Builder withShop(Shop shop) {
			this.shop = shop;
			return this;
		}

		public Branch build() {
			return new Branch(this);
		}
	}

	public Shop getShop() {
		return shop;
	}

	public void setShop(Shop shop) {
		this.shop = shop;
	}

}
