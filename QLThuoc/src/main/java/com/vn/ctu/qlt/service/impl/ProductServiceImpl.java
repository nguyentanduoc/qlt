package com.vn.ctu.qlt.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.vn.ctu.qlt.dto.ProductDto;
import com.vn.ctu.qlt.dto.ProductSelectionDto;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.repository.ProductRepository;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;

import liquibase.util.file.FilenameUtils;

/**
 * The Class ProductServiceImpl.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	/** The upload dir. */
	@Value("${file.upload-dir}")
	private String uploadDir;

	/** The img dir. */
	@Value("${file.img}")
	private String imgDir;

	/** The product repository. */
	@Autowired
	private ProductRepository productRepository;

	/** The spec unit service. */
	@Autowired
	private SpecUnitService specUnitService;

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.ProductService#getAll()
	 */
	@Override
	public List<ProductSelectionDto> getAll() {
		List<Product> products = productRepository.findAll();
		List<ProductSelectionDto> result = new ArrayList<ProductSelectionDto>();

		for (Product product : products) {
			result.add(new ProductSelectionDto(product.getId(), product.getProductName()));
		}
		return result;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.ProductService#save(java.lang.String, org.springframework.web.multipart.MultipartFile)
	 */
	@Override
	public Product save(String model, MultipartFile file) throws IOException {
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		Gson g = new Gson();
		ProductDto productDto = g.fromJson(model, ProductDto.class);
		Set<SpecUnit> specUnits = specUnitService.getAllBySelection(productDto.getSpecUnits());
		// save file
		String fileName = file.getOriginalFilename();
		InputStream is = file.getInputStream();
		Files.copy(is, Paths.get(uploadDir + imgDir + productDto.getProductName() +'.'+extension),
				StandardCopyOption.REPLACE_EXISTING);
		Product product = new Product();
		product.setProductName(productDto.getProductName());
		product.setImage(imgDir + fileName);
		product.setVirtue(productDto.getVirtue());
		product.setSpecUnits(specUnits);
		productRepository.save(product);
		return product;
	}

	/* (non-Javadoc)
	 * @see com.vn.ctu.qlt.service.ProductService#getSpecUnit(java.lang.Long)
	 */
	@Override
	public Set<SpecUnitSelectionDto> getSpecUnit(Long id) {
		Product product = productRepository.getOne(id);
		Set<SpecUnit> specUnits = product.getSpecUnits();
		Set<SpecUnitSelectionDto> specUnitsSelection = new HashSet<>();
		specUnits.forEach(action -> specUnitsSelection.add(new SpecUnitSelectionDto(action)));
		return specUnitsSelection;
	}
}
