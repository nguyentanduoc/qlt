package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity(name = "lich_su_gia")
@Table
@EqualsAndHashCode
@AllArgsConstructor
public class PriceHistory implements Serializable, Comparable<PriceHistory> {

	private static final long serialVersionUID = 1899221885017462334L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

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

	@Override
	public int compareTo(PriceHistory o) {
		return getDate().compareTo(o.getDate());
	}
}
