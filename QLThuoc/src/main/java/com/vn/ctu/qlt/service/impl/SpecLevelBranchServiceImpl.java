package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.SpecLevelBranchDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.model.SpecLevelBranch;
import com.vn.ctu.qlt.repository.SpecLevelBranchRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.ShopService;
import com.vn.ctu.qlt.service.SpecLevelBranchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SpecLevelBranchServiceImpl implements SpecLevelBranchService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private SpecLevelBranchRepository specLevelBranchRepository;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @Autowired
    private ShopService shopService;

    @Override
    public void save(SpecLevelBranchDto specLevelBranchDto) {
        logger.debug("save");
        SpecLevelBranch specLevelBranch = new SpecLevelBranch();
        BeanUtils.copyProperties(specLevelBranchDto, specLevelBranch);
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shop = shopService.findShopByDirector(employee);
        if (!shop.isPresent()) {
            logger.error("Không tìm thấy cửa hàng");
            throw new BadRequestException("Không tìm thấy cửa hàng");
        }
        specLevelBranch.setShop(shop.get());
        specLevelBranchRepository.save(specLevelBranch);
    }

    @Override
    public List<SpecLevelBranchDto> getAll() {
        Iterable<SpecLevelBranch> specLevelBranches = specLevelBranchRepository.findAll();
        List<SpecLevelBranchDto> specLevelBranchesDto = new ArrayList<>();
        specLevelBranches.forEach(action -> {
            SpecLevelBranchDto specLevelBranchDto = new SpecLevelBranchDto();
            BeanUtils.copyProperties(action, specLevelBranchDto);
            specLevelBranchesDto.add(specLevelBranchDto);
        });
        return specLevelBranchesDto;
    }

    @Override
    public List<SpecLevelBranchDto> getAllByShop() {
        List<SpecLevelBranchDto> response = new ArrayList<>();
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shopOptional = shopService.findShopByDirector(employee);
        if (!shopOptional.isPresent()) throw new BadRequestException("Không tìm thấy Cửa hàng");
        Shop shop = shopOptional.get();
        List<SpecLevelBranch> specLevelBranches = shop.getSpecLevelBranches();
        specLevelBranches.forEach(action -> {
            SpecLevelBranchDto specLevelBranchDto = new SpecLevelBranchDto();
            BeanUtils.copyProperties(action, specLevelBranchDto);
            response.add(specLevelBranchDto);
        });
        return response;
    }

    @Override
    public Optional<SpecLevelBranch> getById(Long id) {
        return specLevelBranchRepository.findById(id);
    }
}
