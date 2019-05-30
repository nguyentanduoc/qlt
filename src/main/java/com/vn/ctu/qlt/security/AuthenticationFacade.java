package com.vn.ctu.qlt.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.UserService;

@Component
public class AuthenticationFacade implements IAuthenticationFacade {

    @Autowired
    private UserService userSerivce;

    @Autowired
    private EmployeeService employeeService;

    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public Long getIdAccount() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        return userPrincipal.getId();
    }

    @Override
    public Employee getEmployee() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<User> userOption = userSerivce.findById(userPrincipal.getId());
        if (!userOption.isPresent()) throw new BadRequestException("Không tìm thấy tài khoản");
        Optional<Employee> employeeOption = employeeService.findEmployeeByUser(userOption.get());
        if (!employeeOption.isPresent()) throw new BadRequestException("Không tìm thấy Nhân Viên");
        return employeeOption.get();
    }

    @Override
    public User getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        Optional<User> userOption = userSerivce.findById(userPrincipal.getId());
        if(!userOption.isPresent()) throw new BadRequestException("Tài khoản không tồn tại");
        return userOption.get();
    }
}
