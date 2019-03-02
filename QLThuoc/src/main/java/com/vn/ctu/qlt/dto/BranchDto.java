package com.vn.ctu.qlt.dto;

public class BranchDto {

	private Long id;

	private String name;

	private Double longitude;

	private Double latitude;

	private String address;

	private Boolean isEnabled;

	private Long idShop;

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

	public Long getIdShop() {
		return idShop;
	}

	public void setIdShop(Long idShop) {
		this.idShop = idShop;
	}
	
}
