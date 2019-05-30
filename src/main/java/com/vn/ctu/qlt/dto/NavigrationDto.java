package com.vn.ctu.qlt.dto;

import java.util.Set;

import com.vn.ctu.qlt.model.Badge;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.Role;

import lombok.Data;

@Data
public class NavigrationDto {

	private Long id;
	
	private Badge badge;

	private String name;

	private String url;

	private String icon;

	private Boolean title;

	private Integer sortNum;

	private Boolean isChildren;

	private Boolean hasChildren;

	private Set<Role> roles;
	
	private Set<Navigration> children;

	private Long idParent;
}
