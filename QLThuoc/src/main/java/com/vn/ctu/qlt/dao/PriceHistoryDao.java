package com.vn.ctu.qlt.dao;

import java.util.Date;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Instantiates a new price history DAO.
 */
@Data
@Builder
@EqualsAndHashCode
public class PriceHistoryDao {

	/** The product id. */
	private Long productId;

	/** The shop id. */
	private Long shopId;
	
	private Date date;

	/** The price. */
	private Double price;

}
