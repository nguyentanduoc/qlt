package com.vn.ctu.qlt.payload.response;

import java.util.HashSet;
import java.util.Set;

import com.vn.ctu.qlt.model.Badge;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.Role;

public class NavigrationResponse {

	private Integer id;

	private Badge badge;

	private String name;

	private String url;

	private String icon;

	private Boolean title;

	private Integer sortNum;

	private Boolean isChildren;

	private Boolean hasChildren;

	private Set<Role> roles = new HashSet<>();
	
	private Set<Navigration> children = new HashSet<Navigration>();
	
	private Long idParent;

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

	public Set<Navigration> getChildren() {
		return children;
	}

	public void setChildren(Set<Navigration> children) {
		this.children = children;
	}

	public Long getIdParent() {
		return idParent;
	}

	public void setIdParent(Long idParent) {
		this.idParent = idParent;
	}

}
