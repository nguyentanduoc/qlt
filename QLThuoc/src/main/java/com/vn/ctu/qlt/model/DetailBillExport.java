package com.vn.ctu.qlt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Table(name = "chi_tiet_hoa_don_ban_hang")
@Entity
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DetailBillExport implements Serializable {

    private static final long serialVersionUID = -7284552303232962073L;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_hoa_don_ban_hang", referencedColumnName = "ma")
    private BillExport billExport;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_san_pham", referencedColumnName = "ma")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_quy_dinh_don_vi", referencedColumnName = "ma")
    private SpecUnit specUnit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_lich_su_gia", referencedColumnName = "ma")
    private PriceHistory priceHistory;

    @Column(name = "so_luong")
    private Double amount;
}
