package com.vn.ctu.qlt.service;

import java.io.IOException;
import java.util.List;
import java.util.Set;

import org.springframework.web.multipart.MultipartFile;

import com.vn.ctu.qlt.dto.ProductSelectionDto;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.model.Product;

/**
 * The Interface ProductService.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
public interface ProductService {

	/**
	 * Gets the all.
	 *
	 * @return the all
	 */
	public List<ProductSelectionDto> getAll();
	
	/**
	 * Save.
	 *
	 * @param model the model
	 * @param file the file
	 * @return the product
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	public Product save(String model, MultipartFile file) throws IOException;
	
	
	/**
	 * Gets the spec unit.
	 *
	 * @param id the id
	 * @return the spec unit
	 */
	public Set<SpecUnitSelectionDto> getSpecUnit(Long id);
	
	/**
	 * Gets the product by selection.
	 *
	 * @param product the product
	 * @return the product by selection
	 */
	public Product getProductBySelection(ProductSelectionDto product);
	
	/**
	 * Gets the all for seletion with producer.
	 *
	 * @return the all for seletion with producer
	 */
	public Set<ProductSelectionDto> getAllForSeletionWithProducer();
	
	/**
	 * Save import product.
	 *
	 * @param productId the product id
	 * @param branchId the branch id
	 * @param price the price
	 */
	public void saveImportProduct(Long productId, Long branchId, Double amount, Double price, Long specUnit);
}
