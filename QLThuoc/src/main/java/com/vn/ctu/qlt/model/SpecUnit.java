package com.vn.ctu.qlt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class SpecUnit.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "quy_dinh_don_vi")
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class SpecUnit {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The unit in. */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "don_vi_dau_id")
	private Unit unitIn;

	/** The unit out. */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "don_vi_cuoi_id")
	private Unit unitOut;

	/** The amount. */
	@Column(name = "so_luong")
	private Integer amount;

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
	 * Gets the unit in.
	 *
	 * @return the unit in
	 */
	public Unit getUnitIn() {
		return unitIn;
	}

	/**
	 * Sets the unit in.
	 *
	 * @param unitIn the new unit in
	 */
	public void setUnitIn(Unit unitIn) {
		this.unitIn = unitIn;
	}

	/**
	 * Gets the unit out.
	 *
	 * @return the unit out
	 */
	public Unit getUnitOut() {
		return unitOut;
	}

	/**
	 * Sets the unit out.
	 *
	 * @param unitOut the new unit out
	 */
	public void setUnitOut(Unit unitOut) {
		this.unitOut = unitOut;
	}

	/**
	 * Gets the amount.
	 *
	 * @return the amount
	 */
	public Integer getAmount() {
		return amount;
	}

	/**
	 * Sets the amount.
	 *
	 * @param amount the new amount
	 */
	public void setAmount(Integer amount) {
		this.amount = amount;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((amount == null) ? 0 : amount.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((unitIn == null) ? 0 : unitIn.hashCode());
		result = prime * result + ((unitOut == null) ? 0 : unitOut.hashCode());
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
		SpecUnit other = (SpecUnit) obj;
		if (amount == null) {
			if (other.amount != null)
				return false;
		} else if (!amount.equals(other.amount))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (unitIn == null) {
			if (other.unitIn != null)
				return false;
		} else if (!unitIn.equals(other.unitIn))
			return false;
		if (unitOut == null) {
			if (other.unitOut != null)
				return false;
		} else if (!unitOut.equals(other.unitOut))
			return false;
		return true;
	}
}
