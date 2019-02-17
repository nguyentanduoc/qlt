package com.vn.ctu.qlt.service;

import java.util.List;

import com.vn.ctu.qlt.model.Role;

public interface RoleService {

	public List<Role> getRoleByUserId(Long id); 
}
