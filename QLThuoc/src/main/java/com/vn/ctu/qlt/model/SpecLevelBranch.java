package com.vn.ctu.qlt.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

/**
 *
 */
@Entity
@Data
@Table(name="cap_do_chi_nhanh")
@NoArgsConstructor
@AllArgsConstructor
public class SpecLevelBranch implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_cua_hang", referencedColumnName = "ma")
    private Shop shop;

    @Column(name = "ten_cap_do")
    private String levelName;

    @Column(name="quy_dinh_phan_tram_loi")
    private Double percentProfit;
}
