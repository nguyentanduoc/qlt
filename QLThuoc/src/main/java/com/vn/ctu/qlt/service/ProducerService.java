package com.vn.ctu.qlt.service;

import java.util.Set;

import com.vn.ctu.qlt.dto.ProducerSeletion;
import com.vn.ctu.qlt.model.Producer;

public interface ProducerService {

	public Set<ProducerSeletion> getAllForSelection();

	public Producer getByProducerSeletion(ProducerSeletion producerSelection);
}
