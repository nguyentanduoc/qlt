package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.repository.ShopRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.UserService;
import com.vn.ctu.qlt.sevice.mapper.ShopMapper;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The Class ShopServiceImpl.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Service
@Transactional
public class ShopServiceImpl implements ShopService {

    /**
     * The Constant FromTableName.
     */
    private static final StringBuilder FromTableName = new StringBuilder( " from cua_hang " );

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger( getClass() );

    /**
     * The jdbc template.
     */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * The shop repository.
     */
    @Autowired
    private ShopRepository shopRepository;

    /**
     * The shop mapper.
     */
    @Autowired
    private ShopMapper shopMapper;

    /**
     * The user service.
     */
    @Autowired
    private UserService userService;

    /**
     * The domain email.
     */
    @Value("${app.domain.email}")
    private String domainEmail;

    /**
     * The employee service.
     */
    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @Autowired
    private BranchService branchService;

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#save(com.vn.ctu.qlt.dto.ShopDto)
     */
    @Override
    public Map<String, Object> save(ShopDto shopDto) {
        String[] name = shopDto.getNameShop().split( " " );
        StringBuilder userName = new StringBuilder();
        for (String s : name) {
            userName.append( StringUtils.lowerCase( StringUtils.stripAccents( s ) ) );
        }
        userName.append( "admin" );
        String passWord = RandomStringUtils.randomAlphabetic( 10 );
        User user = new User();
        user.setUsername( userName.toString() );
        user.setEmail( userName.append( domainEmail ).toString() );
        user.setPassword( passWord );
        user.setIsEnabled( true );
        user.setIsAdmin( false );
        userService.createUserDirector( user );

        Employee employee = new Employee();
        employee.setNameEmployee( shopDto.getFullName() );
        employee.setUser( user );
        employeeService.save( employee );

        Shop shop = new Shop();
        shop.setId( shopDto.getId() );
        shop.setNameShop( shopDto.getNameShop() );
        shop.setCreatedAt( shopDto.getCreatedAt() );
        shop.setUpdatedAt( shopDto.getUpdatedAt() );
        shop.setEstablishAt( shopDto.getEstablishAt() );
        shop.setIsEnabled( true );
        shop.setEmployee( employee );
        shopRepository.save( shop );

        Map<String, Object> result = new HashMap<>();
        result.put( "account", user );
        result.put( "shop", shop );
        result.put( "password", passWord );
        return result;
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#select(java.lang.String, org.springframework.data.domain.Pageable)
     */
    @Override
    public Page<Shop> select(String condition, Pageable page) {
        if (condition != null) {
            String[] conditions = condition.split( " " );
            List<String> params = new ArrayList<>();
            StringBuilder sqlSelect = new StringBuilder( "select *" ).append( " " );
            StringBuilder sqlWhere = new StringBuilder( "where" ).append( " " );

            for (int i = 0; i < conditions.length; i++) {
                sqlWhere.append( "ten_cua_hang like ? " );
                params.add( "%" + conditions[i] + "%" );
                if (conditions.length - 1 != i)
                    sqlWhere.append( "or" ).append( " " );
            }
            Integer countRecord = count( FromTableName.append( sqlWhere ), params );
            StringBuilder sql = sqlSelect.append( FromTableName );
            sql.append( "LIMIT " ).append( page.getPageSize() ).append( " " );
            sql.append( "OFFSET " ).append( page.getOffset() );
            List<Shop> result = jdbcTemplate.query( sql.toString(), params.toArray(), shopMapper );
            return new PageImpl<>( result, page, countRecord );
        } else {
            return shopRepository.findAll( page );
        }
    }

    /**
     * Count.
     *
     * @param sql    the sql
     * @param params the params
     * @return the int
     * @throws DataAccessException the data access exception
     */
    private int count(StringBuilder sql, List<String> params) throws DataAccessException {
        return queryCount( sql, params, jdbcTemplate, logger );
    }

    private static int queryCount(StringBuilder sql, List<String> params, JdbcTemplate jdbcTemplate, Logger logger) {
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

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#delete(java.lang.Long[])
     */
    @Override
    @Transactional
    public void delete(Long[] keys) {
        for (Long key : keys) {
            shopRepository.deleteById( key );
        }
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#selectAll()
     */
    @Override
    public Iterable<Shop> selectAll() {
        return shopRepository.findAll();
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#findById(java.lang.Long)
     */
    @Override
    public Optional<Shop> findById(Long id) {
        return shopRepository.findById( id );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.ShopService#findShopByDirector(com.vn.ctu.qlt.model.Employee)
     */
    @Override
    public Optional<Shop> findShopByDirector(Employee employee) {
        return shopRepository.findByEmployee( employee );
    }

    @Override
    public ShopDto save(Shop shop) {
        shopRepository.save( shop );
        return modelMapper.map( shop, ShopDto.class );
    }

    @Override
    public Map<String, Object> getReport() {
        Map<String, Object> result = new HashMap<>();
        AtomicInteger totalEmployee = new AtomicInteger();
        Set<Employee> employees = new HashSet<>();
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shopOptional = findShopByDirector( employee );
        if (!shopOptional.isPresent()) throw new BadRequestException( "Không tìm thấy cửa hàng" );
        Shop shop = shopOptional.get();
        Set<Branch> branches = shop.getBranchs();
        for (Branch branch : branches) {
            totalEmployee.addAndGet( branch.getEmployees().size() );
            employees.addAll( branch.getEmployees() );
        }
        Integer totalEmployeeJoinThisMonth = employeeService.countEmployeeJoinShopOnThisMonth( employees );
        result.put( "totalBranch", branches.size() );
        result.put( "totalEmployee", totalEmployee );
        result.put( "totalEmployeeJoinThisMonth", totalEmployeeJoinThisMonth );
        return result;
    }

    @Override
    public Page<ShopDto> selectDto(String condition, Pageable pageable) {
        Page<Shop> shopPage = select( condition, pageable );
        List<Shop> shops = shopPage.getContent();
        return new PageImpl<>( modelToDto( shops ), pageable, shopPage.getTotalPages() );
    }

    @Override
    public List<ShopDto> selectAllDto() {
        Iterable<Shop> shopIterable = selectAll();
        return getShopsDto( shopIterable );
    }

    private List<ShopDto> getShopsDto(Iterable<Shop> shopIterable) {
        List<ShopDto> shopsDto = new ArrayList<>();
        shopIterable.forEach( action -> {
            ShopDto shopDto = new ShopDto();
            EmployeeDto dto = new EmployeeDto();
            BeanUtils.copyProperties( action, shopDto );
            BeanUtils.copyProperties( action.getEmployee(), dto );
            shopDto.setEmployee( dto );
            shopsDto.add( shopDto );
        } );
        return shopsDto;
    }

    private List<ShopDto> modelToDto(List<Shop> shop) {
        return getShopsDto( shop );
    }
}
