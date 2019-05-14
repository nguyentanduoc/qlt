package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.exception.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.UserRepository;
import com.vn.ctu.qlt.service.RoleService;
import com.vn.ctu.qlt.service.UserService;
import com.vn.ctu.qlt.sevice.mapper.UserMapper;

/**
 * The Class UserServiceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
@Transactional
public class UserServiceImpl implements UserService {

    /**
     * The from table.
     */
    private final String FROM_TABLE = "from tai_khoan ";

    /**
     * The conditions.
     */
    private String[] conditions;

    /**
     * The user repo.
     */
    @Autowired
    private UserRepository userRepo;

    /**
     * The jdbc template.
     */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * The role service.
     */
    @Autowired
    private RoleService roleService;

    /**
     * The user mapper.
     */
    @Autowired
    private UserMapper userMapper;

    /**
     * The password encoder.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger( getClass() );

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#searchUser(java.lang.String, org.springframework.data.domain.Pageable)
     */
    @Override
    public PageImpl<User> searchUser(String condition, Pageable page) {
        String[] conditions = condition.split( " " );
        this.conditions = conditions;
        List<String> param = new ArrayList<>();

        StringBuilder sqlSelect = new StringBuilder( "select * " );
        StringBuilder sqlFrom = new StringBuilder( FROM_TABLE );
        StringBuilder sqlWhere = new StringBuilder( "where " );

        for (int i = 0; i < conditions.length; i++) {
            sqlWhere.append( "email like ?" ).append( " or " );
            sqlWhere.append( "ten_dang_nhap like ?" ).append( " " );
            param.add( "%" + conditions[i] + "%" );
            param.add( "%" + conditions[i] + "%" );
            if (conditions.length - 1 != i)
                sqlWhere.append( "or" ).append( " " );
        }
        int countRecord = count( sqlFrom.append( sqlWhere ), param );
        StringBuilder sql = sqlSelect.append( sqlFrom );
        sql.append( "LIMIT " ).append( page.getPageSize() ).append( " " );
        sql.append( "OFFSET " ).append( page.getOffset() );

        List<User> resultUser = jdbcTemplate.query( sql.toString(), param.toArray(), userMapper );

        return new PageImpl<User>( resultUser, page, countRecord );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#count(java.lang.StringBuilder, java.util.List)
     */
    @Override
    public int count(StringBuilder sql, List<String> params) throws DataAccessException {
        StringBuilder sqlCount = new StringBuilder( "Select count(*) " );
        sqlCount.append( sql );
        try {
            Integer result = jdbcTemplate.queryForObject( sqlCount.toString(), params.toArray(), Integer.class );
            return result != null ? result : 0;
        } catch (Exception e) {
            logger.error( e.getMessage() );
            throw e;
        }
    }

    /**
     * Gets the conditions.
     *
     * @return the conditions
     */
    public String[] getConditions() {
        return conditions;
    }

    /**
     * Sets the conditions.
     *
     * @param conditions the new conditions
     */
    public void setConditions(String[] conditions) {
        this.conditions = conditions;
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#findAll()
     */
    @Override
    public List<User> findAll() {
        Stream<User> userStream = StreamSupport.stream( userRepo.findAll().spliterator(), false );
        return userStream.collect( Collectors.toList() );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#findById(java.lang.Long)
     */
    @Override
    public Optional<User> findById(Long id) {
        return userRepo.findById( id );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#save(com.vn.ctu.qlt.model.User)
     */
    @Override
    public void save(User user) {
        userRepo.save( user );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#getAllUser(org.springframework.data.domain.Pageable)
     */
    @Override
    public Page<User> getAllUser(Pageable pageable) {
        return userRepo.findAll( pageable );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#delete(java.lang.Long[])
     */
    @Override
    public void delete(Long[] ids) {
        for (Long id : ids) {
            userRepo.deleteById( id );
        }
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.UserSerivce#createUserDireactor(com.vn.ctu.qlt.model.User)
     */
    @Override
    public User createUserDirector(User user) {
        user.setPassword( passwordEncoder.encode( user.getPassword() ) );
        Optional<Role> role = roleService.getRoleByRoleName( RoleName.ROLE_DIRECTOR );
        Set<Role> roles = new HashSet<>();
        if (!role.isPresent()) throw new BadRequestException( "Không tìm thấy Quyền" );
        roles.add( role.get() );
        user.setRoles( roles );
        userRepo.save( user );
        return user;
    }

    @Override
    public Optional<User> findByUserName(String userName) {
        return userRepo.findByUsername( userName );
    }
}
