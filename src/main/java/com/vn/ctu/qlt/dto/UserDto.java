package com.vn.ctu.qlt.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String password;

    private Boolean isEnabled;

    private Set<RoleDto> roles = new HashSet<>();

    private Boolean isAdmin;
}
