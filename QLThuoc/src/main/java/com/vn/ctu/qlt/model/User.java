package com.vn.ctu.qlt.model;

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
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "tai_khoan", uniqueConstraints = { @UniqueConstraint(columnNames = { "ten_dang_nhap" }),
		@UniqueConstraint(columnNames = { "email" }) })
public class User extends DateAudit {

	private static final long serialVersionUID = 5703375945267510216L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 100)
	@Column(name = "ten_dang_nhap")
	private String username;

	@NaturalId
	@Size(max = 100)
	@Email
	private String email;

	@NotBlank
	@Size(max = 100)
	@Column(name = "mat_khau")
	private String password;
	
	@Column(name = "hoat_dong")
	private Boolean isEnabled;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "quyen_tai_khoan", joinColumns = @JoinColumn(name = "tai_khoan_id"), inverseJoinColumns = @JoinColumn(name = "quyen_id"))
	private Set<Role> roles = new HashSet<>();

	public User(String name, String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	public User(Long id, String username, String email, String password, Boolean isEnabled) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.isEnabled  = isEnabled;
	}
	
	public User(Long id, String username, String email, String password, Boolean isEnabled, Date createAt, Date updateAt, Set<Role> roles) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.isEnabled  = isEnabled;
		this.setCreatedAt(createAt);
		this.setUpdatedAt(updateAt);
		this.roles = roles;
	}

	public User() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

}
