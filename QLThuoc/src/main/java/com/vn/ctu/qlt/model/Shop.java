package com.vn.ctu.qlt.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "cua_hang", uniqueConstraints = { @UniqueConstraint(columnNames = { "ten_cua_hang" }) })
public class Shop extends DateAudit {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "ten_cua_hang")
	private String nameBranh;

	@Column(name = "ngay_thanh_lap")
	private Instant establishAt;

	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	public Long getId() {
		return id;
	}

	public Shop() {
		super();
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNameBranh() {
		return nameBranh;
	}

	public void setNameBranh(String nameBranh) {
		this.nameBranh = nameBranh;
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

}
