package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "lich_su_gia")
@Table
@EqualsAndHashCode
public class PriceHistory implements Serializable {

	private static final long serialVersionUID = 1899221885017462334L;

	@EmbeddedId
	private PriceHistoryId id;

	@MapsId("shopId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_cua_hang", referencedColumnName = "ma")
	private Shop shop;

	@MapsId("productId")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_san_pham", referencedColumnName = "ma")
	private Product product;

	@Column(name = "ngay_thay_doi")
	private Date date;

	@Column(name = "don_gia")
	private Double price;

	public PriceHistory(Shop shop, Product product, Double price) {
		this.id = new PriceHistoryId(product.getId(), shop.getId());
		this.shop = shop;
		this.product = product;
		this.date = new Date();
		this.price = price;
	}
}
