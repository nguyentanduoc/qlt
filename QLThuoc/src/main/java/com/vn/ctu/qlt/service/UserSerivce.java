package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.vn.ctu.qlt.model.User;

public interface UserSerivce {

	public PageImpl<User> searchUser(String condition, Pageable page);

	public int count(StringBuilder sql, List<String> params);

	public List<User> findAll();

	public Optional<User> findById(Long id);

	public void save(User user);

	public Page<User> getAllUser(Pageable pageable);
}
