package com.vn.ctu.qlt.model;

import java.io.Serializable;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * The Class Role.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Entity
@Table(name = "quyen")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Role implements Serializable {

	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 7593006538505672603L;

	/** The id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** The name. */
	@Enumerated(EnumType.STRING)
	@Column(length = 60, name= "ten_quyen")
	private RoleName name;
	
	/** The detail. */
	@Column(length = 60, name= "mo_ta")
	private String detail;
	
	/** The level. */
	@Column(name= "cap_do")
	private Integer level;
	
	/** The navigrations. */
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "navigration_roles", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "navigration_id"))
	private Set<Navigration> navigrations = new HashSet<>();

	/**
	 * Instantiates a new role.
	 */
	public Role() {
		super();
	}

	/**
	 * Instantiates a new role.
	 *
	 * @param builder the builder
	 */
	@Generated("SparkTools")
	private Role(Builder builder) {
		this.id = builder.id;
		this.name = builder.name;
		this.detail = builder.detail;
		this.level = builder.level;
		this.navigrations = builder.navigrations;
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
	 * Gets the name.
	 *
	 * @return the name
	 */
	public RoleName getName() {
		return name;
	}

	/**
	 * Sets the name.
	 *
	 * @param name the new name
	 */
	public void setName(RoleName name) {
		this.name = name;
	}

	/**
	 * Gets the detail.
	 *
	 * @return the detail
	 */
	public String getDetail() {
		return detail;
	}

	/**
	 * Sets the detail.
	 *
	 * @param detail the new detail
	 */
	public void setDetail(String detail) {
		this.detail = detail;
	}

	/**
	 * Gets the level.
	 *
	 * @return the level
	 */
	public Integer getLevel() {
		return level;
	}

	/**
	 * Sets the level.
	 *
	 * @param level the new level
	 */
	public void setLevel(Integer level) {
		this.level = level;
	}

	/**
	 * Gets the navigrations.
	 *
	 * @return the navigrations
	 */
	public Set<Navigration> getNavigrations() {
		return navigrations;
	}

	/**
	 * Sets the navigrations.
	 *
	 * @param navigrations the new navigrations
	 */
	public void setNavigrations(Set<Navigration> navigrations) {
		this.navigrations = navigrations;
	}

	/**
	 * Creates builder to build {@link Role}.
	 * @return created builder
	 */
	@Generated("SparkTools")
	public static Builder builder() {
		return new Builder();
	}

	/**
	 * Builder to build {@link Role}.
	 */
	@Generated("SparkTools")
	public static final class Builder {
		
		/** The id. */
		private Long id;
		
		/** The name. */
		private RoleName name;
		
		/** The detail. */
		private String detail;
		
		/** The level. */
		private Integer level;
		
		/** The navigrations. */
		private Set<Navigration> navigrations = Collections.emptySet();

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
		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		/**
		 * With name.
		 *
		 * @param name the name
		 * @return the builder
		 */
		public Builder withName(RoleName name) {
			this.name = name;
			return this;
		}

		/**
		 * With detail.
		 *
		 * @param detail the detail
		 * @return the builder
		 */
		public Builder withDetail(String detail) {
			this.detail = detail;
			return this;
		}

		/**
		 * With level.
		 *
		 * @param level the level
		 * @return the builder
		 */
		public Builder withLevel(Integer level) {
			this.level = level;
			return this;
		}

		/**
		 * With navigrations.
		 *
		 * @param navigrations the navigrations
		 * @return the builder
		 */
		public Builder withNavigrations(Set<Navigration> navigrations) {
			this.navigrations = navigrations;
			return this;
		}

		/**
		 * Builds the.
		 *
		 * @return the role
		 */
		public Role build() {
			return new Role(this);
		}
	}
	
	
}
