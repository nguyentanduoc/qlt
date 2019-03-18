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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

	/** The unit. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "don_vi_chuan")
	private Unit unit;
	
	/** The producer. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="nha_san_xuat_id")
	private Producer producer;
	
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

	/**
	 * Gets the unit.
	 *
	 * @return the unit
	 */
	public Unit getUnit() {
		return unit;
	}

	/**
	 * Sets the unit.
	 *
	 * @param unit the new unit
	 */
	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	/**
	 * Gets the producer.
	 *
	 * @return the producer
	 */
	public Producer getProducer() {
		return producer;
	}

	/**
	 * Sets the producer.
	 *
	 * @param producer the new producer
	 */
	public void setProducer(Producer producer) {
		this.producer = producer;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((image == null) ? 0 : image.hashCode());
		result = prime * result + ((producer == null) ? 0 : producer.hashCode());
		result = prime * result + ((productName == null) ? 0 : productName.hashCode());
		result = prime * result + ((specUnits == null) ? 0 : specUnits.hashCode());
		result = prime * result + ((unit == null) ? 0 : unit.hashCode());
		result = prime * result + ((virtue == null) ? 0 : virtue.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Product other = (Product) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (image == null) {
			if (other.image != null)
				return false;
		} else if (!image.equals(other.image))
			return false;
		if (producer == null) {
			if (other.producer != null)
				return false;
		} else if (!producer.equals(other.producer))
			return false;
		if (productName == null) {
			if (other.productName != null)
				return false;
		} else if (!productName.equals(other.productName))
			return false;
		if (specUnits == null) {
			if (other.specUnits != null)
				return false;
		} else if (!specUnits.equals(other.specUnits))
			return false;
		if (unit == null) {
			if (other.unit != null)
				return false;
		} else if (!unit.equals(other.unit))
			return false;
		if (virtue == null) {
			if (other.virtue != null)
				return false;
		} else if (!virtue.equals(other.virtue))
			return false;
		return true;
	}
}
