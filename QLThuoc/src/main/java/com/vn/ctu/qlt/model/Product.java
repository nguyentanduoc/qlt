package com.vn.ctu.qlt.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class Product.
 * 
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "san_pham")
@Data
@EqualsAndHashCode
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
	@JoinTable(name = "quy_dinh_don_vi_san_pham", joinColumns = @JoinColumn(name = "san_pham_id"), inverseJoinColumns = @JoinColumn(name = "quy_dinh_don_vi_id"))
	private List<SpecUnit> specUnits = new ArrayList<>();

	/** The unit. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "don_vi_chuan")
	private Unit unit;

	/** The producer. */
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "nha_san_xuat_id")
	private Producer producer;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DetailBillImport> detailBillImports = new ArrayList<DetailBillImport>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<PriceHistory> priceHistorys = new ArrayList<PriceHistory>();

}
