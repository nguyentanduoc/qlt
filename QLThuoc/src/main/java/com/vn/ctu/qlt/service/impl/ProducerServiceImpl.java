package com.vn.ctu.qlt.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ProducerSeletion;
import com.vn.ctu.qlt.model.Producer;
import com.vn.ctu.qlt.repository.ProducerRepository;
import com.vn.ctu.qlt.service.ProducerService;

@Service
@Transactional
public class ProducerServiceImpl implements ProducerService {

	@Autowired
	private ProducerRepository producerRepository;
	
	@Override
	public Set<ProducerSeletion> getAllForSelection() {
		List<Producer> producerList = producerRepository.findAll();
		Set<ProducerSeletion> producerSelections = new HashSet<ProducerSeletion>();
		producerList.forEach(p -> {
			producerSelections.add(new ProducerSeletion(p.getId(), p.getProducerName()));
		});
		return producerSelections;
	}

	@Override
	public Producer getByProducerSeletion(ProducerSeletion producerSelection) {
		return producerRepository.getOne(producerSelection.getValue());
	}
	
}
