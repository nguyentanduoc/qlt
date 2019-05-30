package com.vn.ctu.qlt.service;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import com.vn.ctu.qlt.model.Navigration;

public interface NavService {
	public List<Navigration> getNavListRoleName(Collection<? extends GrantedAuthority> roleNames);
}
