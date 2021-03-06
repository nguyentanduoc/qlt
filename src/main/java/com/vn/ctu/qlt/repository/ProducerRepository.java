package com.vn.ctu.qlt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.Producer;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProducerRepository extends JpaRepository<Producer, Long> {

    List<Producer> findAllByProducerName(String name);

}
