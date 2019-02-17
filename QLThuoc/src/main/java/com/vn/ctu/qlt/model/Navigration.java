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

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.annotation.Generated;
import java.util.Collections;

@Entity
@Table(name = "navigration")
public class Navigration {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "badge_id")
	private Badge badge;

	@Column(length = 254, name = "name")
	private String name;

	@Column(length = 254, name = "url")
	private String url;

	@Column(length = 254, name = "icon")
	private String icon;

	@Column(name = "title")
	private Boolean title;

	@Column(name = "sortNum")
	private Integer sortNum;

	@Column(name = "is_children")
	private Boolean isChildren;

	@Column(name = "has_children")
	private Boolean hasChildren;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "navigration_roles", joinColumns = @JoinColumn(name = "navigration_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@Generated("SparkTools")
	private Navigration(Builder builder) {
		this.id = builder.id;
		this.badge = builder.badge;
		this.name = builder.name;
		this.url = builder.url;
		this.icon = builder.icon;
		this.title = builder.title;
		this.sortNum = builder.sortNum;
		this.isChildren = builder.isChildren;
		this.hasChildren = builder.hasChildren;
		this.roles = builder.roles;
	}

	public Navigration(Integer id, Badge badge, String name, String url, String icon, Boolean title, Integer sortNum,
			Boolean isChildren, Boolean hasChildren) {
		super();
		this.id = id;
		this.badge = badge;
		this.name = name;
		this.url = url;
		this.icon = icon;
		this.title = title;
		this.sortNum = sortNum;
		this.isChildren = isChildren;
		this.hasChildren = hasChildren;
	}

	public Navigration() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Badge getBadge() {
		return badge;
	}

	public void setBadge(Badge badge) {
		this.badge = badge;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Boolean getTitle() {
		return title;
	}

	public void setTitle(Boolean title) {
		this.title = title;
	}

	public Integer getSortNum() {
		return sortNum;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	public Boolean getIsChildren() {
		return isChildren;
	}

	public void setIsChildren(Boolean isChildren) {
		this.isChildren = isChildren;
	}

	public Boolean getHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(Boolean hasChildren) {
		this.hasChildren = hasChildren;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	/**
	 * Creates builder to build {@link Navigration}.
	 * @return created builder
	 */
	@Generated("SparkTools")
	public static Builder builder() {
		return new Builder();
	}

	/**
	 * Builder to build {@link Navigration}.
	 */
	@Generated("SparkTools")
	public static final class Builder {
		private Integer id;
		private Badge badge;
		private String name;
		private String url;
		private String icon;
		private Boolean title;
		private Integer sortNum;
		private Boolean isChildren;
		private Boolean hasChildren;
		private Set<Role> roles = Collections.emptySet();

		private Builder() {
		}

		public Builder withId(Integer id) {
			this.id = id;
			return this;
		}

		public Builder withBadge(Badge badge) {
			this.badge = badge;
			return this;
		}

		public Builder withName(String name) {
			this.name = name;
			return this;
		}

		public Builder withUrl(String url) {
			this.url = url;
			return this;
		}

		public Builder withIcon(String icon) {
			this.icon = icon;
			return this;
		}

		public Builder withTitle(Boolean title) {
			this.title = title;
			return this;
		}

		public Builder withSortNum(Integer sortNum) {
			this.sortNum = sortNum;
			return this;
		}

		public Builder withIsChildren(Boolean isChildren) {
			this.isChildren = isChildren;
			return this;
		}

		public Builder withHasChildren(Boolean hasChildren) {
			this.hasChildren = hasChildren;
			return this;
		}

		public Builder withRoles(Set<Role> roles) {
			this.roles = roles;
			return this;
		}

		public Navigration build() {
			return new Navigration(this);
		}
	}

}
