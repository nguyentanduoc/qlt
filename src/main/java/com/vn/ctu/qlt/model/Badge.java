package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * The Class Badge.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "huy_hieu")
public class Badge implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = -1292363098980499615L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

	/** The variant. */
	@Column(length = 254, name = "bien_the")
	private String variant;

	/** The text. */
	@Column(length = 254, name = "chuoi")
	private String text;

	/**
	 * Instantiates a new badge.
	 */
	public Badge() {

	}

	/**
	 * Instantiates a new badge.
	 *
	 * @param id the id
	 * @param variant the variant
	 * @param text the text
	 */
	public Badge(Long id, String variant, String text) {
		super();
		this.id = id;
		this.variant = variant;
		this.text = text;
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
	 * Gets the variant.
	 *
	 * @return the variant
	 */
	public String getVariant() {
		return variant;
	}

	/**
	 * Sets the variant.
	 *
	 * @param variant the new variant
	 */
	public void setVariant(String variant) {
		this.variant = variant;
	}

	/**
	 * Gets the text.
	 *
	 * @return the text
	 */
	public String getText() {
		return text;
	}

	/**
	 * Sets the text.
	 *
	 * @param text the new text
	 */
	public void setText(String text) {
		this.text = text;
	}

}
