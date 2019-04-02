package com.vn.ctu.qlt.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Table(name="hoa_don_ban_hang")
@Entity
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class BillExport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ma")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_nhan_vien", referencedColumnName = "ma")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ma_chi_nhanh", referencedColumnName = "ma")
    private Branch branch;

    @Column(name = "ngay_lap")
    private Date dateCreated;

    @OneToMany(mappedBy = "billExport", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetailBillExport> detailBillExports = new ArrayList<DetailBillExport>();

}
