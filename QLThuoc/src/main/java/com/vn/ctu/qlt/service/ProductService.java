package com.vn.ctu.qlt.service;

import com.vn.ctu.qlt.dao.ProductOfBranchDao;
import com.vn.ctu.qlt.dto.*;
import com.vn.ctu.qlt.model.PriceHistory;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;

// TODO: Auto-generated Javadoc
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
	 * @param amount the amount
	 * @param price the price
	 * @param specUnit the spec unit
	 */
	public void saveImportProduct(Long productId, Long branchId, Double amount, Double price, Long specUnit);
	
	/**
	 * Gets the product for request.
	 *
	 * @param branchDto the branch dto
	 * @return the product for request
	 */
	public List<ProductSelectionDto> getProductForRequest(BranchDto branchDto);
	
	/**
	 * Gets the amount of product.
	 *
	 * @param productId the product id
	 * @param branchId the branch id
	 * @return the amount of product
	 */
	public Double getAmountOfProduct(Long productId, Long branchId);
	
	/**
	 * Gets the product by id.
	 *
	 * @param id the id
	 * @return the product by id
	 */
	public Product getProductById(Long id);
	
	/**
	 * Save exchange.
	 */
	public void saveExchange(Long branchExchangeId, Long branchRecieveId, Long productId, Double amount);

	/**
	 * Get all product by branch.
	 *
	 * @param branchDto the {@link BranchDto}
	 * @return list {@link ProductOfBranchDto}
	 */
	public List<ProductOfBranchDto> getAllProductByBranch(BranchDto branchDto);

	public PriceHistory getPriceByBranch(Long productId);

	public Double pushAmount(SpecUnit specUnit, ProductOfBranchDao productOfBranch, Double amount, Product product);

	public Double pushAmount(SpecUnit specUnit, Double amount, Product product);

	public void updateProductOfBranch(Long productId, Long branchId, Double amount);

	public Double getInventory(ProductAndSpecUnit productAndSpecUnit);

	public ProductDtoForExport getProductForExport(Long id);

	public List<ProductSelectionDto> searchProductByKeyWord(String keyWord);

	public List<BranchDto> searchBranchHasProduct(ProductAndLocationDto productAndLocationDto);
}
