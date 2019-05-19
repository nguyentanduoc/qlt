package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

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

import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "hoa_don_nhap")
@NoArgsConstructor
@AllArgsConstructor
public class BillImport implements Serializable {

	private static final long serialVersionUID = 6988235894135857629L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

	@Column(name = "ngay_nhap")
	private Date importDate;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_nhan_vien", referencedColumnName = "ma")
	private Employee employee;

	@OneToMany(mappedBy = "billImport", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DetailBillImport> detailBillImports = new ArrayList<DetailBillImport>();

	public BillImport(Employee employee, Branch branch) {
		this.employee = employee;
		this.branch = branch;
		this.importDate = new Date();
	}

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ma_chi_nhanh", referencedColumnName = "ma")
	private Branch branch;

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof BillImport)) return false;
		BillImport that = (BillImport) o;
		return Objects.equals(getId(), that.getId()) &&
				Objects.equals(getImportDate(), that.getImportDate()) &&
				Objects.equals(getEmployee(), that.getEmployee()) &&
				Objects.equals(getDetailBillImports(), that.getDetailBillImports()) &&
				Objects.equals(getBranch(), that.getBranch());
	}

	@Override
	public int hashCode() {
		return Objects.hash(getId(), getImportDate(), getEmployee(), getDetailBillImports(), getBranch());
	}
}
