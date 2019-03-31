package com.vn.ctu.qlt.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vn.ctu.qlt.model.BillRequest;
import com.vn.ctu.qlt.model.Branch;

@Repository
public interface BillRequestRepository extends JpaRepository<BillRequest, Long> {

	public List<BillRequest> findByIsSeenAndIsReceiveAndIsAcceptAndIsDoneAndIsCancelAndBranchMain(Boolean isSeen,
			Boolean isReceive, Boolean isAccept, Boolean isDone, boolean isCancel, Branch branchMain);
}