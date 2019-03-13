package com.vn.ctu.qlt.model;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Generated;
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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * The Class Navigration.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Entity
@Table(name = "navigration")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Navigration {

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

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

	/**
	 * Instantiates a new navigration.
	 *
	 * @param builder the builder
	 */
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
		this.children = builder.children;
		this.idParent = builder.idParent;
	}

	/**
	 * Instantiates a new navigration.
	 *
	 * @param id the id
	 * @param badge the badge
	 * @param name the name
	 * @param url the url
	 * @param icon the icon
	 * @param title the title
	 * @param sortNum the sort num
	 * @param isChildren the is children
	 * @param hasChildren the has children
	 * @param children the children
	 * @param idParent the id parent
	 */
	public Navigration(Integer id, Badge badge, String name, String url, String icon, Boolean title, Integer sortNum,
			Boolean isChildren, Boolean hasChildren, Set<Navigration> children, Long idParent) {
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
		this.children = children;
		this.idParent = idParent;
	}

	/**
	 * Instantiates a new navigration.
	 */
	public Navigration() {
		super();
	}

	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Integer getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Gets the badge.
	 *
	 * @return the badge
	 */
	public Badge getBadge() {
		return badge;
	}

	/**
	 * Sets the badge.
	 *
	 * @param badge the new badge
	 */
	public void setBadge(Badge badge) {
		this.badge = badge;
	}

	/**
	 * Gets the name.
	 *
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Gets the url.
	 *
	 * @return the url
	 */
	public String getUrl() {
		return url;
	}

	/**
	 * Sets the url.
	 *
	 * @param url the new url
	 */
	public void setUrl(String url) {
		this.url = url;
	}

	/**
	 * Gets the icon.
	 *
	 * @return the icon
	 */
	public String getIcon() {
		return icon;
	}

	/**
	 * Sets the icon.
	 *
	 * @param icon the new icon
	 */
	public void setIcon(String icon) {
		this.icon = icon;
	}

	/**
	 * Gets the title.
	 *
	 * @return the title
	 */
	public Boolean getTitle() {
		return title;
	}

	/**
	 * Sets the title.
	 *
	 * @param title the new title
	 */
	public void setTitle(Boolean title) {
		this.title = title;
	}

	/**
	 * Gets the sort num.
	 *
	 * @return the sort num
	 */
	public Integer getSortNum() {
		return sortNum;
	}

	/**
	 * Sets the sort num.
	 *
	 * @param sortNum the new sort num
	 */
	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	/**
	 * Gets the checks if is children.
	 *
	 * @return the checks if is children
	 */
	public Boolean getIsChildren() {
		return isChildren;
	}

	/**
	 * Sets the checks if is children.
	 *
	 * @param isChildren the new checks if is children
	 */
	public void setIsChildren(Boolean isChildren) {
		this.isChildren = isChildren;
	}

	/**
	 * Gets the checks for children.
	 *
	 * @return the checks for children
	 */
	public Boolean getHasChildren() {
		return hasChildren;
	}

	/**
	 * Sets the checks for children.
	 *
	 * @param hasChildren the new checks for children
	 */
	public void setHasChildren(Boolean hasChildren) {
		this.hasChildren = hasChildren;
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
	 * Gets the children.
	 *
	 * @return the children
	 */
	public Set<Navigration> getChildren() {
		return children;
	}

	/**
	 * Sets the children.
	 *
	 * @param children the new children
	 */
	public void setChildren(Set<Navigration> children) {
		this.children = children;
	}

	/**
	 * Gets the id parent.
	 *
	 * @return the id parent
	 */
	public Long getIdParent() {
		return idParent;
	}

	/**
	 * Sets the id parent.
	 *
	 * @param idParent the new id parent
	 */
	public void setIdParent(Long idParent) {
		this.idParent = idParent;
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
		
		/** The id. */
		private Integer id;
		
		/** The badge. */
		private Badge badge;
		
		/** The name. */
		private String name;
		
		/** The url. */
		private String url;
		
		/** The icon. */
		private String icon;
		
		/** The title. */
		private Boolean title;
		
		/** The sort num. */
		private Integer sortNum;
		
		/** The is children. */
		private Boolean isChildren;
		
		/** The has children. */
		private Boolean hasChildren;
		
		/** The roles. */
		private Set<Role> roles = Collections.emptySet();
		
		/** The children. */
		private Set<Navigration> children = Collections.emptySet();
		
		/** The id parent. */
		private Long idParent;

		/**
		 * Instantiates a new builder.
		 */
		private Builder() {
		}

		/**
		 * With id.
		 *
		 * @param id the id
		 * @return the builder
		 */
		public Builder withId(Integer id) {
			this.id = id;
			return this;
		}

		/**
		 * With badge.
		 *
		 * @param badge the badge
		 * @return the builder
		 */
		public Builder withBadge(Badge badge) {
			this.badge = badge;
			return this;
		}

		/**
		 * With name.
		 *
		 * @param name the name
		 * @return the builder
		 */
		public Builder withName(String name) {
			this.name = name;
			return this;
		}

		/**
		 * With url.
		 *
		 * @param url the url
		 * @return the builder
		 */
		public Builder withUrl(String url) {
			this.url = url;
			return this;
		}

		/**
		 * With icon.
		 *
		 * @param icon the icon
		 * @return the builder
		 */
		public Builder withIcon(String icon) {
			this.icon = icon;
			return this;
		}

		/**
		 * With title.
		 *
		 * @param title the title
		 * @return the builder
		 */
		public Builder withTitle(Boolean title) {
			this.title = title;
			return this;
		}

		/**
		 * With sort num.
		 *
		 * @param sortNum the sort num
		 * @return the builder
		 */
		public Builder withSortNum(Integer sortNum) {
			this.sortNum = sortNum;
			return this;
		}

		/**
		 * With is children.
		 *
		 * @param isChildren the is children
		 * @return the builder
		 */
		public Builder withIsChildren(Boolean isChildren) {
			this.isChildren = isChildren;
			return this;
		}

		/**
		 * With has children.
		 *
		 * @param hasChildren the has children
		 * @return the builder
		 */
		public Builder withHasChildren(Boolean hasChildren) {
			this.hasChildren = hasChildren;
			return this;
		}

		/**
		 * With roles.
		 *
		 * @param roles the roles
		 * @return the builder
		 */
		public Builder withRoles(Set<Role> roles) {
			this.roles = roles;
			return this;
		}
		
		/**
		 * With chirent.
		 *
		 * @param children the children
		 * @return the builder
		 */
		public Builder withChirent(Set<Navigration> children) {
			this.children = children;
			return this;
		}
		
		/**
		 * With parent.
		 *
		 * @param idParent the id parent
		 * @return the builder
		 */
		public Builder withParent(Long idParent) {
			this.idParent = idParent;
			return this;
		}

		/**
		 * Builds the.
		 *
		 * @return the navigration
		 */
		public Navigration build() {
			return new Navigration(this);
		}
	}

}
