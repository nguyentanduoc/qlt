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

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "quyen")
public class Role implements Serializable {

	private static final long serialVersionUID = 7593006538505672603L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	@NaturalId
	@Column(length = 60, name= "ten_quyen")
	private RoleName name;
	
	@Column(length = 60, name= "mo_ta")
	private String detail;
	
	@Column(name= "cap_do")
	private Integer level;
	
	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "navigration_roles", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "navigration_id"))
	private Set<Navigration> navigrations = new HashSet<>();

	public Role() {
		super();
	}

	@Generated("SparkTools")
	private Role(Builder builder) {
		this.id = builder.id;
		this.name = builder.name;
		this.detail = builder.detail;
		this.level = builder.level;
		this.navigrations = builder.navigrations;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public RoleName getName() {
		return name;
	}

	public void setName(RoleName name) {
		this.name = name;
	}

	public String getDetail() {
		return detail;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public Set<Navigration> getNavigrations() {
		return navigrations;
	}

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
		private Long id;
		private RoleName name;
		private String detail;
		private Integer level;
		private Set<Navigration> navigrations = Collections.emptySet();

		private Builder() {
		}

		public Builder withId(Long id) {
			this.id = id;
			return this;
		}

		public Builder withName(RoleName name) {
			this.name = name;
			return this;
		}

		public Builder withDetail(String detail) {
			this.detail = detail;
			return this;
		}

		public Builder withLevel(Integer level) {
			this.level = level;
			return this;
		}

		public Builder withNavigrations(Set<Navigration> navigrations) {
			this.navigrations = navigrations;
			return this;
		}

		public Role build() {
			return new Role(this);
		}
	}
	
	
}
