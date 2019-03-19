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
	private Long id;

	@Column(name = "ngay_nhap")
	private Date importDate;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "nhan_vien_id", referencedColumnName = "id")
	private Employee employee;

	@OneToMany(mappedBy = "billImport", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<DetailBillImport> detailBillImports = new ArrayList<DetailBillImport>();

	public BillImport(Employee employee) {
		this.employee = employee;
		this.importDate = new Date();
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BillImport other = (BillImport) obj;
		if (detailBillImports == null) {
			if (other.detailBillImports != null)
				return false;
		} else if (!detailBillImports.equals(other.detailBillImports))
			return false;
		if (employee == null) {
			if (other.employee != null)
				return false;
		} else if (!employee.equals(other.employee))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (importDate == null) {
			if (other.importDate != null)
				return false;
		} else if (!importDate.equals(other.importDate))
			return false;
		return true;
	}

	@Override
	public int hashCode() {
		HashCodeBuilder hcb = new HashCodeBuilder();
		hcb.append(detailBillImports);
		hcb.append(employee);
		hcb.append(id);
		hcb.append(importDate);
		return hcb.toHashCode();
	}
}
