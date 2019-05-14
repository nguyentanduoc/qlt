package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.*;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.repository.EmployeeRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The Class EmployeeServiceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final Logger logger = LoggerFactory.getLogger( getClass() );

    private static final DateFormat sdf = new SimpleDateFormat( "yyyy/MM/dd HH:mm:ss" );

    /**
     * The employee repository.
     */
    @Autowired
    private EmployeeRepository employeeRepository;

    /**
     * The branch service.
     */
    @Autowired
    private BranchService branchService;

    /**
     * The role service.
     */
    @Autowired
    private RoleService roleService;

    /**
     * The password default.
     */
    @Value("${app.passwordDefault}")
    private String passwordDefault;

    /**
     * The password encoder.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * The user service.
     */
    @Autowired
    private UserService userService;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @Autowired
    private ShopService shopService;

    @Autowired
    private ModelMapper modelMapper;

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#save(com.vn.ctu.qlt.model.Employee)
     */
    @Override
    public Employee save(Employee employee) {
        employeeRepository.save( employee );
        return employee;
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#findById(java.lang.Long)
     */
    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById( id );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#findEmployeeByUser(com.vn.ctu.qlt.model.User)
     */
    @Override
    public Optional<Employee> findEmployeeByUser(User user) {
        return employeeRepository.findByUser( user );
    }

    @Override
    public Set<EmployeeDto> getAllEmployeeByDirector() {
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shop = shopService.findShopByDirector( employee );
        if (!shop.isPresent()) throw new BadRequestException( "Không tìm thấy cửa hàng" );
        Set<Employee> employees = new HashSet<>();
        Set<EmployeeDto> employeesDto = new HashSet<>();
        Set<Branch> branches = shop.get().getBranchs();
        branches.forEach( branch -> employees.addAll( branch.getEmployees() ) );
        employees.forEach( emp -> {
            EmployeeDto employeeDto = new EmployeeDto();
            User user = emp.getUser();
            Set<Role> roles = user.getRoles();
            Set<RoleSeletionDto> rolesSelectionDto = roleService.convertRolesToRolesDto( roles );
            BeanUtils.copyProperties( emp, employeeDto );
            Set<BranchesSelectionDto> branchesSelectionDto = branchService.covertBranchedToBranchesSelection( emp.getBranchs() );
            employeeDto.setRoles( rolesSelectionDto );
            employeeDto.setBranches( branchesSelectionDto );
            employeeDto.setUsername( user.getUsername() );
            employeesDto.add( employeeDto );
        } );
        return employeesDto;
    }

    @Override
    public void deleteEmployee(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById( id );
        if (!employeeOptional.isPresent()) throw new BadRequestException( "Nhân viên không tồn tại" );
        employeeRepository.deleteById( id );
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#save(com.vn.ctu.qlt.dto.EmployeeDto)
     */
    @Override
    public Employee save(EmployeeDto employeeDto) {
        logger.debug( "employeeServiceImpl > save" );
        if (employeeDto.getId() == null && userService.findByUserName( employeeDto.getUsername() ).isPresent())
            throw new BadRequestException( "Tên tài khoản tồn tại" );
        User user;
        Employee employee;
        Set<Branch> branches = branchService.findByList( employeeDto.getBranches() );
        Set<Role> roles = roleService.getRolesByRoleSeletion( employeeDto.getRoles() );
        if (employeeDto.getId() != null) {
            Optional<Employee> employeeOption = employeeRepository.findById( employeeDto.getId() );
            if (!employeeOption.isPresent()) throw new BadRequestException( "Nhân viên không tồn tại" );
            user = employeeOption.get().getUser();
            employee = employeeOption.get();
        } else {
            user = new User();
            user.setUsername( employeeDto.getUsername() );
            user.setPassword( passwordEncoder.encode( passwordDefault ) );
            user.setIsEnabled( true );
            user.setIsAdmin( false );
            employee = new Employee();
            employee.setUser( user );
        }
        user.setRoles( roles );
        employee.setBranchs( branches );
        employee.setNameEmployee( employeeDto.getNameEmployee() );
        employee.setNumberPhone( employeeDto.getNumberPhone() );
        userService.save( user );
        employeeRepository.save( employee );
        return employee;
    }

    @Override
    public EmployeeDto save(EmployeeDtoLeaderSave employeeDto) {
        Optional<User> userOptional = userService.findByUserName( employeeDto.getUsername() );
        if (userOptional.isPresent()) throw new BadRequestException( "Tên tài khoản đã tồn tại" );

        Set<Role> roles = roleService.getRolesByRoleSeletion( employeeDto.getRoles() );
        User user = new User();
        user.setIsAdmin( false );
        user.setRoles( roles );
        user.setIsEnabled( true );
        user.setPassword( passwordEncoder.encode( passwordDefault ) );
        user.setUsername( employeeDto.getUsername() );

        Set<Branch> branches = new HashSet<>();
        branches.add( branchService.getBranchById( employeeDto.getBranch().getId() ) );

        Employee employee = new Employee();
        employee.setNumberPhone( employeeDto.getNumberPhone() );
        employee.setBranchs( branches );
        employee.setUser( user );
        employee.setNameEmployee( employeeDto.getNameEmployee() );
        userService.save( user );
        save( employee );

        return modelMapper.map( employee, EmployeeDto.class );
    }

    @Override
    public EmployeeDto update(EmployeeDtoLeaderSave employeeDto) {
        Optional<Employee> employeeOptional = findById( employeeDto.getId() );
        if (!employeeOptional.isPresent()) throw new BadRequestException( "Nhân Viên không tồn tại" );
        Set<Role> roles = roleService.getRolesByRoleSeletion( employeeDto.getRoles() );
        Employee employee = employeeOptional.get();
        User user = employee.getUser();
        user.setRoles( roles );
        userService.save( user );
        employee.setUser( user );
        save( employee );
        EmployeeDto employeeDtoResponse = modelMapper.map( employee, EmployeeDto.class );
        employeeDtoResponse.setRoles( employeeDto.getRoles() );
        return employeeDtoResponse;
    }

    @Override
    public Set<EmployeeDto> getAllEmployeeByBranch(BranchDto branchDto) {
        Branch branch = branchService.getBranchById( branchDto.getId() );
        if (branch == null) throw new BadRequestException( "Không tìm thấy Chi Nhánh" );
        List<Employee> employees = branch.getEmployees();
        Set<EmployeeDto> employeesDto = new HashSet<>();
        employees.forEach( employee -> {
            EmployeeDto employeeDto = modelMapper.map( employee, EmployeeDto.class );
            Set<Role> roles = employee.getUser().getRoles();
            employeeDto.setRoles( roleService.convertRolesToRolesDto( roles ) );
            employeesDto.add( employeeDto );
        } );
        return employeesDto;
    }

    @Override
    public Integer countEmployeeJoinShopOnThisMonth(Set<Employee> employees) {
        Calendar cal = Calendar.getInstance();
        AtomicInteger result = new AtomicInteger();
        for (Employee employee : employees) {
            if (sdf.format( cal.getTime() ).equals( sdf.format( employee.getUser().getCreatedAt() ) )) {
                result.addAndGet( 1 );
            }
        }
        return result.get();
    }
}
