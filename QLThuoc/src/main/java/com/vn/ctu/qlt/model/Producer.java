package com.vn.ctu.qlt.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "nha_san_xuat")
@Data
public class Producer implements Serializable {

	private static final long serialVersionUID = 7893043818529469662L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

	@Column(name = "ten_nha_san_xuat")
	private String producerName;
}
