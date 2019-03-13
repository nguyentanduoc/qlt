package com.vn.ctu.qlt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Unit.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "don_vi")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Unit {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The unit name. */
	@Column(name = "ten_don_vi")
	private String unitName;

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
	 * Gets the unit name.
	 *
	 * @return the unit name
	 */
	public String getUnitName() {
		return unitName;
	}

	/**
	 * Sets the unit name.
	 *
	 * @param unitName the new unit name
	 */
	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

}
