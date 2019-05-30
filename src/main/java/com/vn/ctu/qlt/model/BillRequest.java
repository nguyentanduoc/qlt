package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Table(name="phieu_yeu_cau")
@Entity
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class BillRequest implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1654846876465L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_nhan_vien_yeu_cau", referencedColumnName = "ma")
	private Employee employeeRequest;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_nhan_vien_chuyen", referencedColumnName = "ma")
	private Employee employeeAccept;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_chi_nhanh_yeu_cau", referencedColumnName = "ma")
	private Branch branchRequest;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_chi_nhanh_chinh", referencedColumnName = "ma")
	private Branch branchMain;
	
	@Column(name="ngay_yeu_cau")
	private Date dateRequested;
	
	@Column(name="ngay_chuyen")
	private Date dateExchanged;
	
	@Column(name="da_xem")
	private Boolean isSeen;
	
	@Column(name="da_nhan")
	private Boolean isReceive;
	
	@Column(name="ghi_chu_yeu_cau")
	private String noteRequest;
	
	@Column(name="ghi_chu_chuyen")
	private String noteExchange;
	
	@Column(name="chap_thuan")
	private Boolean isAccept;
	
	@Column(name="xac_nhan_hoan_tat")
	private Boolean isDone;
	
	@Column(name="huy")
	private Boolean isCancel;
	
	@OneToMany(mappedBy = "billRequest", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DetailBillRequest> detailBillRequests = new ArrayList<DetailBillRequest>();

}
