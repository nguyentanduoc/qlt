package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.BranchSaveExport;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ExportServiceImpl implements ExportService {

    @Autowired
    private BranchService branchService;

    @Autowired
    private ProductService productService;

    @Autowired
    private PriceHistoryService priceHistoryService;

    @Autowired
    private SpecUnitService specUnitService;


    @Override
    public void save(BranchSaveExport branchSaveExport) {
        Branch branch = branchService.getBranchById(branchSaveExport.getBranch().getId());
        List<ProductOfBranch> productsOfBranch = branch.getProductsOfBranch();
        branchSaveExport.getDataSubmits().forEach(action -> {
            Product product = productService.getProductById(action.getProduct().getValue());
            SpecUnit specUnit = specUnitService.getById(action.getSpecUnit().getValue());
            Double amount = productService.pushAmount(specUnit, action.getAmount(), product);
            ProductOfBranch productOfBranch = productsOfBranch.stream()
                    .filter(predicate -> predicate.getProduct().equals(product))
                    .findAny().orElse(null);
            if (productOfBranch != null) {
                Double inputAmount = productOfBranch.getAmount() - amount;
                productService.updateProductOfBranch(product.getId(), branch.getId(), inputAmount);
            } else {
                throw new BadRequestException("Không tồn tài Sản Phẩm trong Chi Nhánh");
            }
        });
    }
}
