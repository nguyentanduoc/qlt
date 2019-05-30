package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.PriceHistory;
import com.vn.ctu.qlt.model.Producer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {
}
