package com.vn.ctu.qlt.service;

import java.util.List;
import java.util.Set;

import com.vn.ctu.qlt.dto.ProducerSeletion;
import com.vn.ctu.qlt.model.Producer;

public interface ProducerService {

    Set<ProducerSeletion> getAllForSelection();

    Producer getByProducerSelection(ProducerSeletion producerSelection);

    Producer getProducerById(Long id);

    List<ProducerSeletion> getAllProducer();

    void save(String producerName);

}
