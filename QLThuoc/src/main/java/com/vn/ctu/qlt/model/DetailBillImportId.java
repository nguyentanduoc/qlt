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
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DetailBillImportId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 954848866100793635L;

	@Column(name = "san_pham_id")
	private Long productId;
	
	@Column(name = "hoa_don_nhap_id")
	private Long billImportId;

}
