package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table
@Data
@NoArgsConstructor
@Entity(name = "san_pham_chi_nhanh")
@EqualsAndHashCode
public class ProductOfBranch implements Serializable {

	private static final long serialVersionUID = -1428494754100222717L;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_chi_nhanh", referencedColumnName = "ma")
	private Branch branch;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_san_pham", referencedColumnName = "ma")
	private Product product;

	@Column(name = "so_luong")
	private Integer amount;
}
