package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.BillImport;
import com.vn.ctu.qlt.model.DetailBillImport;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.repository.BillImportRepository;
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

	@Override
	public void save(Set<ImportProductDto> importProductsDto, Employee employee) {
		try {
			List<DetailBillImport> detailBillImports = new ArrayList<DetailBillImport>();
			BillImport billImport = new BillImport(employee);
			importProductsDto.forEach(p -> {
				Product product = productService.getProductBySelection(p.getProduct());
				SpecUnit specUnit = specUnitService.getBySelection(p.getSpecUnit());
				detailBillImports.add(new DetailBillImport(billImport, product, specUnit, p.getAmount(), p.getPrice()));
			});
			billImportRepository.save(billImport);
		}catch (Exception e) {
			logger.error(e.getMessage());
		}
		
	}

}
