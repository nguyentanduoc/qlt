package com.vn.ctu.qlt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.User;

/**
 * The Interface UserRepository.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Repository
public interface  UserRepository extends PagingAndSortingRepository<User, Long> {

	/**
	 * Find by email.
	 *
	 * @param email the email
	 * @return the optional
	 */
	public Optional<User> findByEmail(String email);

	/**
	 * Find by id in.
	 *
	 * @param userIds the user ids
	 * @return the list
	 */
	public List<User> findByIdIn(List<Long> userIds);

	/**
	 * Find by username.
	 *
	 * @param username the username
	 * @return the optional
	 */
	public Optional<User> findByUsername(String username);

	/**
	 * Exists by username.
	 *
	 * @param username the username
	 * @return the boolean
	 */
	public Boolean existsByUsername(String username);

	/**
	 * Exists by email.
	 *
	 * @param email the email
	 * @return the boolean
	 */
	public Boolean existsByEmail(String email);
}
