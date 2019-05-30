package com.vn.ctu.qlt.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.SuperBuilder;

/**
 * The Class Shop.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "cua_hang")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Shop extends DateAudit {

    /**
     * The Constant serialVersionUID.
     */
    private static final long serialVersionUID = 1L;

    /**
     * The id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma")
    private Long id;

    /**
     * The name shop.
     */
    @Column(name = "ten_cua_hang")
    private String nameShop;

    /**
     * The establish at.
     */
    @Column(name = "ngay_thanh_lap")
    private Date establishAt;

    /**
     * The is enabled.
     */
    @Column(name = "hoat_dong")
    private Boolean isEnabled;

    /**
     * The employee.
     */
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ma_nhan_vien")
    private Employee employee;

    /**
     * The branchs.
     */
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "shop")
    private Set<Branch> branchs;

    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<PriceHistory> priceHistorys;


    @OneToMany(mappedBy = "shop", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<SpecLevelBranch> specLevelBranches;
}
