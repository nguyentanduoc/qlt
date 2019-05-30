package com.vn.ctu.qlt.service.impl;

import com.vn.ctu.qlt.dto.BillExportDto;
import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.BranchSaveExport;
import com.vn.ctu.qlt.dto.SaveExportDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.repository.BillExportRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Date;
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

    @Autowired
    private BillExportRepository billExportRepository;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public void save(BranchSaveExport branchSaveExport) {
        BillExport billExport = new BillExport();
        Branch branch = branchService.getBranchById(branchSaveExport.getBranch().getId());
        List<ProductOfBranch> productsOfBranch = branch.getProductsOfBranch();
        Employee employee = iAuthenticationFacade.getEmployee();
        billExport.setEmployee(employee);
        billExport.setDateCreated(new Date());
        billExport.setBranch(branch);
        billExport.setIsShare(branchSaveExport.getIsShare());
        branchSaveExport.getDataSubmits().forEach(action -> {
            Product product = productService.getProductById(action.getProduct().getValue());
            SpecUnit specUnit = specUnitService.getById(action.getSpecUnit().getValue());
            Double amount = productService.pushAmount(specUnit, action.getAmount(), product);
            ProductOfBranch productOfBranch = productsOfBranch.stream()
                    .filter(predicate -> predicate.getProduct().equals(product))
                    .findAny().orElse(null);
            PriceHistory priceHistory = priceHistoryService.getById(action.getPriceHistory());
            if (productOfBranch != null) {
                Double inputAmount = productOfBranch.getAmount() - amount;
                productService.updateProductOfBranch(product.getId(), branch.getId(), inputAmount);
                DetailBillExport detailBillExport = new DetailBillExport();
                detailBillExport.setAmount(action.getAmount());
                detailBillExport.setProduct(product);
                detailBillExport.setPriceHistory(priceHistory);
                detailBillExport.setSpecUnit(specUnit);
                detailBillExport.setBillExport(billExport);
                billExport.getDetailBillExports().add(detailBillExport);
            } else {
                throw new BadRequestException("Không tồn tài Sản Phẩm trong Chi Nhánh");
            }
        });
        billExportRepository.save(billExport);
    }

    @Override
    public List<BillExport> findAll() {
        Sort sort = new Sort(Sort.Direction.DESC, "dateCreated");
        List<BillExport> billExports = billExportRepository.findAll(sort);
        return billExports;
    }

    @Override
    public List<BillExportDto> convert(List<BillExport> billExports) {
        List<BillExportDto> billsExportDto = new ArrayList<>();
        for (BillExport billExport : billExports) {
            billsExportDto.add(modelMapper.map(billExport, BillExportDto.class));
        }
        return billsExportDto;
    }

    @Override
    public Optional<BillExport> findById(Long id) {
        return billExportRepository.findById(id);
    }

    @Override
    public List<BillExport> findAllByDate(Date date) {
        return billExportRepository.findAllByDateCreated(date);
    }

    @Override
    public List<BillExport> findBillExportDateCreatedBetween(List<Date> dates, BranchDto branchDto) {
        Branch branch = branchService.getBranchById(branchDto.getId());
        return billExportRepository.findAllByDateCreatedBetweenAndBranch(dates.get(0), dates.get(1), branch);
    }

}
