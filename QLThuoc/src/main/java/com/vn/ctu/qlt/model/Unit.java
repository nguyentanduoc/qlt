package com.vn.ctu.qlt.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class Unit.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "don_vi")
@Data
@EqualsAndHashCode
public class Unit {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

	/** The unit name. */
	@Column(name = "ten_don_vi")
	private String unitName;

}
