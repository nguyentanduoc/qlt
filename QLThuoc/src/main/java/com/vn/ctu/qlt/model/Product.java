package com.vn.ctu.qlt.model;

import java.util.HashSet;
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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Product.
 * 
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "san_pham")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Product {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The product name. */
	@Column(name = "ten_san_pham")
	private String productName;

	/** The virtue. */
	@Column(name = "cong_dung")
	private String virtue;

	/** The image. */
	@Column(name = "hinh_anh")
	private String image;

	
	/** The spec units. */
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "quy_dinh_don_vi_san_pham",
		joinColumns = @JoinColumn(name = "san_pham_id"),
		inverseJoinColumns = @JoinColumn(name = "quy_dinh_don_vi_id"))
	private Set<SpecUnit> specUnits = new HashSet<>();

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
	 * Gets the product name.
	 *
	 * @return the product name
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * Sets the product name.
	 *
	 * @param productName the new product name
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * Gets the image.
	 *
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * Sets the image.
	 *
	 * @param image the new image
	 */
	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * Gets the virtue.
	 *
	 * @return the virtue
	 */
	public String getVirtue() {
		return virtue;
	}

	/**
	 * Sets the virtue.
	 *
	 * @param virtue the new virtue
	 */
	public void setVirtue(String virtue) {
		this.virtue = virtue;
	}

	
	/**
	 * Gets the spec units.
	 *
	 * @return the spec units
	 */
	public Set<SpecUnit> getSpecUnits() {
		return specUnits;
	}

	
	/**
	 * Sets the spec units.
	 *
	 * @param specUnits the new spec units
	 */
	public void setSpecUnits(Set<SpecUnit> specUnits) {
		this.specUnits = specUnits;
	}
}
