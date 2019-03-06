package com.vn.ctu.qlt.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;
import com.vn.ctu.qlt.repository.RoleRepository;
import com.vn.ctu.qlt.service.RoleService;
import com.vn.ctu.qlt.sevice.mapper.RoleMapper;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public Set<Role> getRoleByUserId(Long id) {
		try {
			StringBuilder sql = new StringBuilder("Select q.id, q.ten_quyen, q.mo_ta, q.cap_do ");
			sql.append("from quyen q inner join quyen_tai_khoan qtk on q.id = qtk.quyen_id ");
			sql.append("where qtk.tai_khoan_id = ?");
			List<Role> userList = jdbcTemplate.query(sql.toString(), new Object[] { id }, new RoleMapper());
			return new HashSet<Role>(userList);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public List<Role> getAll() {
		return roleRepository.findAll();
	}

	@Override
	public List<Role> findByRoleNameForAdmin() {
		return roleRepository.findRoleByAdmin();
	}

	public Set<Role> getRolesByRoles(List<Role> roles) {
		Set<Role> resource = new HashSet<Role>();
		
		for(Role role : roles) {
			switch(role.getLevel()) {
			case 1:
				resource.addAll(roleRepository.findRoleByAdmin());
				break;
			case 2: 
				resource.addAll(roleRepository.findRoleByDirector());
				break;
			case 3: 
				resource.addAll(roleRepository.findRoleByLeader());
			default: break;
			}
		}
		return resource;
	}

	@Override
	public Optional<Role> findRoleByRoleName(RoleName roleName) {
		return roleRepository.findByName(roleName);
	}
}
