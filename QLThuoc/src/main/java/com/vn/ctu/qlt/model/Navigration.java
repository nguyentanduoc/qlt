package com.vn.ctu.qlt.model;

import java.util.HashSet;
import java.util.Set;

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
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

/**
 * The Class Navigration.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "navigration")
@Data
public class Navigration {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The badge. */
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "badge_id")
	private Badge badge;

	/** The name. */
	@Column(length = 254, name = "name")
	private String name;

	/** The url. */
	@Column(length = 254, name = "url")
	private String url;

	/** The icon. */
	@Column(length = 254, name = "icon")
	private String icon;

	/** The title. */
	@JsonIgnore
	@Column(name = "title")
	private Boolean title;

	/** The sort num. */
	@JsonIgnore
	@Column(name = "sortNum")
	private Integer sortNum;

	/** The is children. */
	@JsonIgnore
	@Column(name = "is_children")
	private Boolean isChildren;

	/** The has children. */
	@JsonIgnore
	@Column(name = "has_children")
	private Boolean hasChildren;

	/** The roles. */
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "navigration_roles", joinColumns = @JoinColumn(name = "navigration_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	/** The children. */
	@Transient
	@JsonInclude(Include.NON_EMPTY)
	private Set<Navigration> children = new HashSet<Navigration>();
	
	/** The id parent. */
	@JsonIgnore
	@Column(name="parent_id")
	private Long idParent;

}
