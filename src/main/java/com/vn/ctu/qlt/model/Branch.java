package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * The Class Branch.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "chi_nhanh")
@Data
@EqualsAndHashCode
public class Branch implements Serializable {

    /**
     * The Constant serialVersionUID.
     */
    private static final long serialVersionUID = 6646370807108789380L;

    /**
     * The id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ma")
    private Long id;

    /**
     * The name.
     */
    @NotBlank
    @Size(max = 100)
    @Column(name = "ten_chi_nhanh")
    private String name;

    /**
     * The longitude.
     */
    @Column(name = "kinh_do")
    private Double longitude;

    /**
     * The latitude.
     */
    @Column(name = "vi_do")
    private Double latitude;

    /**
     * The address.
     */
    @Column(name = "dia_chi")
    private String address;

    /**
     * The is enabled.
     */
    @Column(name = "hoat_dong")
    private Boolean isEnabled;

    @Column(name = "chi_nhanh_chinh")
    private Boolean isMain;

    /**
     * The shop.
     */
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_cua_hang")
    private Shop shop;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductOfBranch> productsOfBranch = new ArrayList<ProductOfBranch>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "nhan_vien_chi_nhanh", joinColumns = @JoinColumn(name = "ma_chi_nhanh"), inverseJoinColumns = @JoinColumn(name = "ma_nhan_vien"))
    @JsonIgnore
    private List<Employee> employees = new ArrayList<Employee>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_cap_do_chi_nhanh")
    private SpecLevelBranch specLevelBranch;

}
