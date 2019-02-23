package com.vn.ctu.qlt.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.annotation.Generated;

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
	private Instant establishAt;

	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	@Generated("SparkTools")
	private Shop(Builder builder) {
		this.id = builder.id;
		this.nameShop = builder.nameShop;
		this.establishAt = builder.establishAt;
		this.isEnabled = builder.isEnabled;
		this.setCreatedAt(builder.createAt);
		this.setUpdatedAt(builder.updateAt);
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

	public Instant getEstablishAt() {
		return establishAt;
	}

	public void setEstablishAt(Instant establishAt) {
		this.establishAt = establishAt;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	/**
	 * Creates builder to build {@link Shop}.
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
		private Instant establishAt;
		private Boolean isEnabled;
		private Instant createAt;
		private Instant updateAt;

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

		public Builder withEstablishAt(Instant establishAt) {
			this.establishAt = establishAt;
			return this;
		}

		public Builder withIsEnabled(Boolean isEnabled) {
			this.isEnabled = isEnabled;
			return this;
		}
		
		public Builder withCreateAt(Instant createAt) {
			this.createAt = createAt;
			return this;
		}
		public Builder withUpdateAt(Instant updateAt) {
			this.updateAt = updateAt;
			return this;
		}

		public Shop build() {
			return new Shop(this);
		}
	}

}
