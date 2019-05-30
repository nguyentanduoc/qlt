package com.vn.ctu.qlt.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.dto.UserDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.exception.AppException;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Navigration;
import com.vn.ctu.qlt.model.Role;
import com.vn.ctu.qlt.model.RoleName;
import com.vn.ctu.qlt.model.User;
import com.vn.ctu.qlt.payload.ApiResponse;
import com.vn.ctu.qlt.payload.LoginRequest;
import com.vn.ctu.qlt.payload.SignUpRequest;
import com.vn.ctu.qlt.payload.response.JwtAuthenticationResponse;
import com.vn.ctu.qlt.payload.response.LoginSuccess;
import com.vn.ctu.qlt.repository.RoleRepository;
import com.vn.ctu.qlt.repository.UserRepository;
import com.vn.ctu.qlt.security.JwtTokenProvider;
import com.vn.ctu.qlt.security.UserPrincipal;
import com.vn.ctu.qlt.service.EmployeeService;
import com.vn.ctu.qlt.service.NavService;

/**
 * The Class AuthController.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * The authentication manager.
     */
    @Autowired
    private AuthenticationManager authenticationManager;

    /**
     * The user repository.
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * The role repository.
     */
    @Autowired
    private RoleRepository roleRepository;

    /**
     * The password encoder.
     */
    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * The token provider.
     */
    @Autowired
    private JwtTokenProvider tokenProvider;

    /**
     * The role service.
     */
    @Autowired
    private NavService navService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * Authenticate user.
     *
     * @param loginRequest the login request
     * @return the response entity
     */
    @PostMapping("/signin")
    public ResponseEntity<LoginSuccess> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        logger.debug("AuthController do sign in");
        try {
            boolean flgIsMainBranch = false;
            List<BranchDto> branchesDto = new ArrayList<>();
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            List<Navigration> navs = navService.getNavListRoleName(authentication.getAuthorities());
            String jwt = tokenProvider.generateToken(authentication);
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Optional<User> user = userRepository.findById(userPrincipal.getId());
            Set<String> authorities = new HashSet<String>();
            if (!user.isPresent()) throw new BadRequestException("không tìm thấy user");
            for (Role role : user.get().getRoles()) {
                authorities.add(role.getName().toString());
            }
            if (!user.get().getIsAdmin()) {
                Optional<Employee> employee = employeeService.findEmployeeByUser(user.get());
                if (!employee.isPresent()) throw new BadRequestException("Nhân viên không tồn tại");
                Set<Branch> branches = employee.get().getBranchs();
                branches.forEach(action -> {
                    BranchDto branchDto = new BranchDto();
                    ShopDto shopDto = new ShopDto();
                    BeanUtils.copyProperties(action, branchDto);
                    BeanUtils.copyProperties(action.getShop(), shopDto);
                    branchDto.setShop(shopDto);
                    branchesDto.add(branchDto);
                });
            }
            UserDto userDto = modelMapper.map(user.get(), UserDto.class);
            LoginSuccess loginSuccess = new LoginSuccess(new JwtAuthenticationResponse(jwt), userDto, navs,
                    authorities, branchesDto);
            return ResponseEntity.ok(loginSuccess);
        } catch (BadCredentialsException e) {
            throw e;
        }
    }

    @PostMapping(path = "/logout")
    public void logoutPage(HttpServletRequest request, HttpServletResponse response, HttpSession session) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
    }
}
