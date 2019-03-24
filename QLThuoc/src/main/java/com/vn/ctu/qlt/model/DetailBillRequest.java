package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="chi_tiet_phieu_yeu_cau")
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class DetailBillRequest implements Serializable {

	private static final long serialVersionUID = -1881707378619214403L;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_phieu_yeu_cau", referencedColumnName = "ma")
	private BillRequest billRequest;
	
	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_san_pham", referencedColumnName = "ma")
	private Product product;
	
	@Column(name = "so_luong")
	private Double amount;
}
