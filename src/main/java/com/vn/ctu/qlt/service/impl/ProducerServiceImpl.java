package com.vn.ctu.qlt.service.impl;

import java.util.*;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ProducerSeletion;
import com.vn.ctu.qlt.exception.BadRequestException;
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
        producerList.forEach(p ->
                producerSelections.add(new ProducerSeletion(p.getId(), p.getProducerName()))
        );
        return producerSelections;
    }

    @Override
    public Producer getByProducerSelection(ProducerSeletion producerSelection) {
        return producerRepository.getOne(producerSelection.getValue());
    }

    @Override
    public Producer getProducerById(Long id) {
        Optional<Producer> producer = producerRepository.findById(id);
        if (!producer.isPresent()) throw new BadRequestException("Không tìm thấy Nhà Sản Xuất");
        return producer.get();
    }

    @Override
    public List<ProducerSeletion> getAllProducer() {
        List<Producer> producers = producerRepository.findAll();
        List<ProducerSeletion> producerSelections = new ArrayList<>();
        for (Producer producer : producers) {
            ProducerSeletion producerSeletion = new ProducerSeletion();
            producerSeletion.setLabel(producer.getProducerName());
            producerSeletion.setValue(producer.getId());
            producerSelections.add(producerSeletion);
        }
        return producerSelections;
    }

    @Override
    public void save(String producerName) {
        Producer producer = new Producer();
        producer.setProducerName(producerName);
        producerRepository.save(producer);
    }

    @Override
    public List<Producer> getByName(String name) {
        return producerRepository.findAllByProducerName(name);
    }

    @Override
    public Producer save(Producer producer){
        producerRepository.save(producer);
        return producer;
    }
}
