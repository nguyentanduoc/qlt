package com.vn.ctu.qlt.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * The Class ProductOfBranch.
 */
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductOfBranchDao {

	/** The product id. */
	private Long productId;

	/** The branch id. */
	private Long branchId;

	/** The amount. */
	private Double amount;
}
