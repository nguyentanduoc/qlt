package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchesSelectionDto;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.Set;

// TODO: Auto-generated Javadoc
/**
 * The Interface BranchService.
 *
 * @author NTD
 */
public interface BranchService {

	/**
	 * Save.
	 *
	 * @param branch the branch
	 */
	public void save(BranchDto branch);
	
	/**
	 * Save.
	 *
	 * @param branch the branch
	 */
	public void save(Branch branch);

	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	public Page<BranchDto> findAll(Pageable pageable);
	
	/**
	 * Delete all.
	 *
	 * @param keys the keys
	 */
	public void deleteAll(Long[] keys);
	
	/**
	 * Search.
	 *
	 * @param condition the condition
	 * @param pageable the pageable
	 * @return the page
	 */
	public Page<BranchDto> search(String condition, Pageable pageable);
	
	/**
	 * Gets the branh by director.
	 *
	 * @param idDirector the id director
	 * @param pageable the pageable
	 * @return the branh by director
	 */
	public PageImpl<BranchDto> getBranhByDirector(Long idDirector, Pageable pageable);
	
	/**
	 * Select branch by director.
	 *
	 * @param idDirector the id director
	 * @return the sets the
	 */
	public Set<Branch> selectBranchByDirector(Long idDirector);
	
	/**
	 * Select branch by director dto.
	 *
	 * @param idDirector the id director
	 * @return the sets the
	 */
	public Set<BranchDto> selectBranchByDirectorDto(Long idDirector);
	
	/**
	 * Find by list.
	 *
	 * @param branches the branchs
	 * @return the sets the
	 */
	public Set<Branch> findByList(Set<BranchesSelectionDto> branches);
	
	/**
	 * Gets the branch by employee.
	 *
	 * @param employee the employee
	 * @return the branch by employee
	 */
	public Branch getBranchByEmployee(Employee employee);
	
	/**
	 * Gets the branch by id.
	 *
	 * @param id the id
	 * @return the branch by id
	 */
	public Branch getBranchById(Long id);
	
	/**
	 * Gets the main branch by branch.
	 *
	 * @param id the id
	 * @return the main branch by branch
	 */
	public Branch getMainBranchByBranch(Long id);

	public Set<BranchesSelectionDto> covertBranchedToBranchesSelection(Set<Branch> branches);
}
