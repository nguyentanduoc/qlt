package com.vn.ctu.qlt.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.RoleSeletionDto;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;
import com.vn.ctu.qlt.repository.RoleRepository;
import com.vn.ctu.qlt.service.RoleService;
import com.vn.ctu.qlt.sevice.mapper.RoleMapper;

/**
 * The Class RoleServiceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    /**
     * The role repository.
     */
    @Autowired
    private RoleRepository roleRepository;

    /**
     * The jdbc template.
     */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getRoleByUserId(java.lang.Long)
     */
    @Override
    public Set<Role> getRoleByUserId(Long id) {
        try {
            StringBuilder sql = new StringBuilder("Select q.ma, q.ten_quyen, q.mo_ta, q.cap_do ");
            sql.append("from quyen q inner join quyen_tai_khoan qtk on q.id = qtk.ma_quyen ");
            sql.append("where qtk.ma_tai_khoan = ?");
            List<Role> userList = jdbcTemplate.query(sql.toString(), new Object[]{id}, new RoleMapper());
            return new HashSet<Role>(userList);
        } catch (Exception e) {
            throw e;
        }
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getAll()
     */
    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getByRoleNameForAdmin()
     */
    @Override
    public List<Role> getByRoleNameForAdmin() {
        return roleRepository.findRoleByAdmin();
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getRolesByRoles(java.util.List)
     */
    public Set<Role> getRolesByRoles(List<Role> roles) {
        Set<Role> resource = new HashSet<Role>();

        for (Role role : roles) {
            switch (role.getLevel()) {
                case 1:
                    resource.addAll(roleRepository.findRoleByAdmin());
                    break;
                case 2:
                    resource.addAll(roleRepository.findRoleByDirector());
                    break;
                case 3:
                    resource.addAll(roleRepository.findRoleByLeader());
                default:
                    break;
            }
        }
        return resource;
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getRoleByRoleName(com.vn.ctu.qlt.model.RoleName)
     */
    @Override
    public Optional<Role> getRoleByRoleName(RoleName roleName) {
        return roleRepository.findByName(roleName);
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getRoleForDirector()
     */
    @Override
    public List<Role> getRoleForDirector() {
        return roleRepository.findRoleByDirector();
    }


    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.RoleService#getRolesByRoleSeletion(java.util.Set)
     */
    @Override
    @Transactional
    public Set<Role> getRolesByRoleSeletion(Set<RoleSeletionDto> roles) {
        Set<Role> result = new HashSet<Role>();
        for (RoleSeletionDto role : roles) {
            Optional<Role> roleOptional = roleRepository.findById(role.getValue());
            if (!roleOptional.isPresent()) throw new BadRequestException("Không tìm thất Quyền");
            result.add(roleOptional.get());
        }
        return result;
    }

    @Override
    public Set<RoleSeletionDto> convertRolesToRolesDto(Set<Role> roles) {
        Set<RoleSeletionDto> rolesSelectionDto = new HashSet<>();
        roles.forEach(role -> {
            RoleSeletionDto roleSeletionDto = new RoleSeletionDto();
            roleSeletionDto.setValue(role.getId());
            roleSeletionDto.setLabel(role.getDetail());
            rolesSelectionDto.add(roleSeletionDto);
        });
        return rolesSelectionDto;
    }
}
