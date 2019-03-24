package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class PriceHistoryId implements Serializable {

	private static final long serialVersionUID = -2604468982652523467L;

	@Column(name = "ma_san_pham")
	private Long productId;

	@Column(name = "ma_chi_nhanh")
	private Long branchId;

}
