package com.vn.ctu.qlt.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "quyen", uniqueConstraints = { @UniqueConstraint(columnNames = "code_quyen") })
public class Role implements GrantedAuthority {

	private static final long serialVersionUID = -4115616530078843932L;

	@Id
	@Column(name = "code_quyen")
	@JsonProperty("authority")
	private String authority;

	@Column(name = "ten_quyen")
	@JsonProperty("name")
	private String name;

	public Role(String authority, String name) {
		super();
		this.authority = authority;
		this.name = name;
	}

	@Override
	public String getAuthority() {
		return authority;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
}
