package com.vn.ctu.qlt.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.Navigration;

@Repository
public interface NavigrationRepository extends JpaRepository<Navigration, Long> {

	@Query("select n from Navigration n where n.isChildren = false")
	public List<Navigration> findAllByTitleByOrderBySortNum(Sort sort);
	
	@Query("select n from Navigration n where n.title = false and (n.sortNum > :sortNum and n.sortNum < :sortNumMax)")
	public List<Navigration> getSubNav(@Param("sortNum") Integer sortNum, @Param("sortNumMax") Integer sortNumMax, Sort sort);
	
	@Query("select n from Navigration n where n.idParent = :idParent")
	public Set<Navigration> getChildren(@Param("idParent") Long idParent);
	
	public Set<Navigration> findAllByIdParent(Long idParent, Sort sort);
	
}
