package com.vn.ctu.qlt.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 * The Class User.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "tai_khoan")
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends DateAudit {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 5703375945267510216L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="ma")
	private Long id;

	/** The username. */
	@NotBlank
	@Size(max = 100)
	@Column(name = "ten_dang_nhap")
	private String username;

	/** The email. */
	@Size(max = 100)
	@Email
	private String email;

	/** The password. */
	@NotBlank
	@Size(max = 100)
	@Column(name = "mat_khau")
	private String password;
	
	/** The is enabled. */
	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	/** The roles. */
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "quyen_tai_khoan", joinColumns = @JoinColumn(name = "ma_tai_khoan"), inverseJoinColumns = @JoinColumn(name = "ma_quyen"))
	private Set<Role> roles = new HashSet<>();

	@Column(name = "la_quan_tri")
	private Boolean isAdmin;
}
