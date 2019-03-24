package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.HashCodeBuilder;

import lombok.Data;

@Data
@Entity
@Table(name = "chi_tiet_hoa_don_nhap")
public class DetailBillImport implements Serializable {

	private static final long serialVersionUID = -7284552303232962073L;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_hoa_don_nhap", referencedColumnName = "ma")
	private BillImport billImport;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_san_pham", referencedColumnName = "ma")
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_quy_dinh_don_vi", referencedColumnName = "ma")
	private SpecUnit spectUnit;

	@Column(name = "so_luong")
	private Double amount;

	@Column(name = "don_gia")
	private Double price;

	public DetailBillImport(BillImport billImport, Product product, SpecUnit spectUnit, Double amount, Double price) {
		super();
		this.billImport = billImport;
		this.product = product;
		this.amount = amount;
		this.price = price;
		this.spectUnit = spectUnit;
	}

	public DetailBillImport() {
		super();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		DetailBillImport other = (DetailBillImport) obj;
		if (amount == null) {
			if (other.amount != null)
				return false;
		} else if (!amount.equals(other.amount))
			return false;
		if (billImport == null) {
			if (other.billImport != null)
				return false;
		} else if (!billImport.equals(other.billImport))
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		if (product == null) {
			if (other.product != null)
				return false;
		} else if (!product.equals(other.product))
			return false;
		if (spectUnit == null) {
			if (other.spectUnit != null)
				return false;
		} else if (!spectUnit.equals(other.spectUnit))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		HashCodeBuilder hcb = new HashCodeBuilder();
		hcb.append(amount);
		hcb.append(billImport);
		hcb.append(price);
		hcb.append(product);
		hcb.append(spectUnit);
		return hcb.hashCode();
	}

}
