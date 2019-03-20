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

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class SpecUnit.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "quy_dinh_don_vi")
@Data
@EqualsAndHashCode
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
}
