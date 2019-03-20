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
public class User extends DateAudit {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 5703375945267510216L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	@JoinTable(name = "quyen_tai_khoan", joinColumns = @JoinColumn(name = "tai_khoan_id"), inverseJoinColumns = @JoinColumn(name = "quyen_id"))
	private Set<Role> roles = new HashSet<>();

	/**
	 * Instantiates a new user.
	 *
	 * @param name the name
	 * @param username the username
	 * @param email the email
	 * @param password the password
	 */
	public User(String name, String username, String email, String password) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
	}
	
	/**
	 * Instantiates a new user.
	 *
	 * @param id the id
	 * @param username the username
	 * @param email the email
	 * @param password the password
	 * @param isEnabled the is enabled
	 */
	public User(Long id, String username, String email, String password, Boolean isEnabled) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.isEnabled  = isEnabled;
	}
	
	/**
	 * Instantiates a new user.
	 *
	 * @param id the id
	 * @param username the username
	 * @param email the email
	 * @param password the password
	 * @param isEnabled the is enabled
	 * @param createAt the create at
	 * @param updateAt the update at
	 * @param roles the roles
	 */
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

	/**
	 * Instantiates a new user.
	 */
	public User() {
		super();
	}

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the username.
	 *
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Sets the username.
	 *
	 * @param username the new username
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Gets the email.
	 *
	 * @return the email
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Sets the email.
	 *
	 * @param email the new email
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Gets the password.
	 *
	 * @return the password
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Sets the password.
	 *
	 * @param password the new password
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Gets the roles.
	 *
	 * @return the roles
	 */
	public Set<Role> getRoles() {
		return roles;
	}

	/**
	 * Sets the roles.
	 *
	 * @param roles the new roles
	 */
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	/**
	 * Gets the checks if is enabled.
	 *
	 * @return the checks if is enabled
	 */
	public Boolean getIsEnabled() {
		return isEnabled;
	}

	/**
	 * Sets the checks if is enabled.
	 *
	 * @param isEnabled the new checks if is enabled
	 */
	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

}
