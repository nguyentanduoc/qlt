package com.vn.ctu.qlt.service.impl;

import java.util.*;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.dto.BranchesSelectionDto;
import com.vn.ctu.qlt.dto.EmployeeDtoLeaderSave;
import com.vn.ctu.qlt.dto.RoleSeletionDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.*;
import jdk.nashorn.internal.runtime.options.Option;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.EmployeeDto;
import com.vn.ctu.qlt.repository.EmployeeRepository;

/**
 * The Class EmployeeServiceImpl.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * The employee repository.
     */
    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private UserSerivce userSerivce;

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
    private UserSerivce userService;

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
        employeeRepository.save(employee);
        return employee;
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#findById(java.lang.Long)
     */
    @Override
    public Optional<Employee> findById(Long id) {
        return employeeRepository.findById(id);
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#findEmployeeByUser(com.vn.ctu.qlt.model.User)
     */
    @Override
    public Optional<Employee> findEmployeeByUser(User user) {
        return employeeRepository.findByUser(user);
    }

    @Override
    public Set<EmployeeDto> getAllEmployeeByDirector() {
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shop = shopService.findShopByDirector(employee);
        if (!shop.isPresent()) throw new BadRequestException("Không tìm thấy cửa hàng");
        Set<Employee> employees = new HashSet<>();
        Set<EmployeeDto> employeesDto = new HashSet<>();
        Set<Branch> branches = shop.get().getBranchs();
        branches.forEach(branch -> employees.addAll(branch.getEmployees()));
        employees.forEach(emp -> {
            EmployeeDto employeeDto = new EmployeeDto();
            User user = emp.getUser();
            Set<Role> roles = user.getRoles();
            Set<RoleSeletionDto> rolesSelectionDto = roleService.convertRolesToRolesDto(roles);
            BeanUtils.copyProperties(emp, employeeDto);
            Set<BranchesSelectionDto> branchesSelectionDto = branchService.covertBranchedToBranchesSelection(emp.getBranchs());
            employeeDto.setRoles(rolesSelectionDto);
            employeeDto.setBranches(branchesSelectionDto);
            employeeDto.setUsername(user.getUsername());
            employeesDto.add(employeeDto);
        });
        return employeesDto;
    }

    @Override
    public void deleteEmployee(Long id) {
        Optional<Employee> employeeOptional = employeeRepository.findById(id);
        if (!employeeOptional.isPresent()) throw new BadRequestException("Nhân viên không tồn tại");
        employeeRepository.deleteById(id);
    }

    /* (non-Javadoc)
     * @see com.vn.ctu.qlt.service.EmployeeService#save(com.vn.ctu.qlt.dto.EmployeeDto)
     */
    @Override
    public Employee save(EmployeeDto employeeDto) {
        logger.debug("employeeServiceImpl > save");
        if (employeeDto.getId() == null && userSerivce.findByUserName(employeeDto.getUsername()).isPresent())
            throw new BadRequestException("Tên tài khoản tồn tại");
        User user;
        Employee employee;
        Set<Branch> branches = branchService.findByList(employeeDto.getBranches());
        Set<Role> roles = roleService.getRolesByRoleSeletion(employeeDto.getRoles());
        if (employeeDto.getId() != null) {
            Optional<Employee> employeeOption = employeeRepository.findById(employeeDto.getId());
            if (!employeeOption.isPresent()) throw new BadRequestException("Nhân viên không tồn tại");
            user = employeeOption.get().getUser();
            employee = employeeOption.get();
        } else {
            user = new User();
            user.setUsername(employeeDto.getUsername());
            user.setPassword(passwordEncoder.encode(passwordDefault));
            user.setIsEnabled(true);
            user.setIsAdmin(false);
            employee = new Employee();
            employee.setUser(user);
        }
        user.setRoles(roles);
        employee.setBranchs(branches);
        employee.setNameEmployee(employeeDto.getNameEmployee());
        employee.setNumberPhone(employeeDto.getNumberPhone());
        userService.save(user);
        employeeRepository.save(employee);
        return employee;
    }

    @Override
    public EmployeeDto save(EmployeeDtoLeaderSave employeeDto) {
        Optional<User> userOptional = userSerivce.findByUserName(employeeDto.getUsername());
        if(userOptional.isPresent()) throw new BadRequestException("Tên tài khoản đã tồn tại");

        Set<Role> roles = roleService.getRolesByRoleSeletion(employeeDto.getRoles());
        User user = new User();
        user.setIsAdmin(false);
        user.setRoles(roles);
        user.setIsEnabled(true);
        user.setPassword(passwordEncoder.encode(passwordDefault));
        user.setUsername(employeeDto.getUsername());

        Set<Branch> branches = new HashSet<>();
        branches.add(branchService.getBranchById(employeeDto.getBranch().getId()));

        Employee employee = new Employee();
        employee.setNumberPhone(employeeDto.getNumberPhone());
        employee.setBranchs(branches);
        employee.setUser(user);
        employee.setNameEmployee(employeeDto.getNameEmployee());
        userSerivce.save(user);
        save(employee);

        EmployeeDto employeeDto1 = modelMapper.map(employee, EmployeeDto.class);
        return employeeDto1;
    }

    @Override
    public  EmployeeDto update(EmployeeDtoLeaderSave employee) {
        return null;
    }
}
