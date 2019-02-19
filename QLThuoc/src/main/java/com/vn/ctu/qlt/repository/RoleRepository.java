package com.vn.ctu.qlt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByName(RoleName roleName);
	
	@Query("select r from Role r where r.name = 'ROLE_ADMIN' or r.name= 'ROLE_DIRECTOR'")
	List<Role> findRoleByAdmin();
	
	@Query("select r from Role r where r.name = 'ROLE_EMPLOYEE' or r.name= 'ROLE_LEADER'")
	List<Role> findRoleByDirector();
	
	@Query("select r from Role r where r.name = 'ROLE_EMPLOYEE'")
	List<Role> findRoleByLeader();
}
