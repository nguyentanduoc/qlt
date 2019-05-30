package com.vn.ctu.qlt.service.impl;

import javax.transaction.Transactional;

import com.vn.ctu.qlt.dto.BillImportDto;
import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.ImportConditionDto;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.BillImport;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.DetailBillImport;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.repository.BillImportRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.ImportProductService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImportProductServiceImpl implements ImportProductService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private BillImportRepository billImportRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private SpecUnitService specUnitService;

    @Autowired
    private IAuthenticationFacade authenticationFacade;

    @Autowired
    private BranchService branchService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void save(ImportProductDto importProductDto) {
        try {
            Employee employee = authenticationFacade.getEmployee();
            Branch mainBranch = branchService.getBranchById(importProductDto.getBranch().getId());
            BillImport billImport = new BillImport(employee, mainBranch);
            importProductDto.getData().forEach(p -> {
                Product product = productService.getProductBySelection(p.getProduct());
                SpecUnit specUnit = specUnitService.getBySelection(p.getSpecUnit());
                DetailBillImport detail = new DetailBillImport(billImport, product, specUnit, p.getAmount(),
                        p.getPrice());
                billImport.getDetailBillImports().add(detail);
                productService.saveImportProduct(product.getId(), mainBranch.getId(), p.getAmount(), p.getPrice(), p.getSpecUnit().getValue());
            });
            billImportRepository.save(billImport);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public Optional<BillImport> findById(Long id) {
        return billImportRepository.findById(id);
    }

    @Override
    public List<BillImport> findByDate(Date date) {
        return billImportRepository.findAllByImportDate(date);
    }

    @Override
    public List<BillImport> findByDateAndId(ImportConditionDto importConditionDto) {
        return billImportRepository.findAllByIdAndImportDate(importConditionDto.getId(), importConditionDto.getDateCreated());
    }

    @Override
    public List<BillImport> findAll() {
        Sort sort = new Sort(Sort.Direction.DESC, "importDate");
        return billImportRepository.findAll(sort);
    }

    @Override
    public BillImportDto convertObject(BillImport billImport) {
        return modelMapper.map(billImport, BillImportDto.class);
    }

    @Override
    public List<BillImportDto> convertList(List<BillImport> billImports) {
        List<BillImportDto> billImportsDto = new ArrayList<>();
        for (BillImport billImport : billImports) {
            billImportsDto.add(convertObject(billImport));
        }
        return billImportsDto;
    }

    @Override
    public List<BillImport> findBillImportBetween(List<Date> dates, BranchDto branchDto) {
        Branch branch = branchService.getBranchById(branchDto.getId());
        return billImportRepository.findAllByImportDateBetweenAndBranch(dates.get(0), dates.get(1), branch);
    }
}
