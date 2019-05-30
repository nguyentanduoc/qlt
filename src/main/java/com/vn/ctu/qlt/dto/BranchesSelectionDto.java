package com.vn.ctu.qlt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * The Class BranchesSelectionDto.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BranchesSelectionDto implements Serializable {

    /**
     * The Constant serialVersionUID.
     */
    private static final long serialVersionUID = -1682217644294141559L;

    private Long value;

    private String label;

}
