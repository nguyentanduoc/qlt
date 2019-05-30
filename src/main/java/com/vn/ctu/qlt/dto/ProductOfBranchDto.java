package com.vn.ctu.qlt.dto;

import com.vn.ctu.qlt.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductOfBranchDto {

    private ProductSelectionDto product;

    private Double amount;
}
