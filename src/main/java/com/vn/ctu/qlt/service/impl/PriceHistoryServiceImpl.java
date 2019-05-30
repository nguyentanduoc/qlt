package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.PriceHistory;
import com.vn.ctu.qlt.repository.PriceHistoryRepository;
import com.vn.ctu.qlt.service.PriceHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PriceHistoryServiceImpl implements PriceHistoryService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private PriceHistoryRepository priceHistoryRepository;

    @Override
    public PriceHistory getById(Long id) {
        Optional<PriceHistory> optionalPriceHistory = priceHistoryRepository.findById(id);
        if (!optionalPriceHistory.isPresent()) {
            logger.error("getById: Không Tìm thấy PriceHistory có ID: " + id);
            throw new BadRequestException("Không Tìm thấy PriceHistory có ID: " + id);
        }
        return optionalPriceHistory.get();
    }
}
