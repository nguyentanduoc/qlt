package com.vn.ctu.qlt.service.impl;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.vn.ctu.qlt.service.ImportRoductService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;

@Service
@Transactional
public class ImportRoductServiceImpl implements ImportRoductService {

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

    @Override
    public void save(ImportProductDto importProductDto) {
        try {
            Employee employee = authenticationFacade.getEmployee();
            BillImport billImport = new BillImport(employee);

            Branch mainBranch = branchService.getBranchById(importProductDto.getBranch().getId());

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

}
