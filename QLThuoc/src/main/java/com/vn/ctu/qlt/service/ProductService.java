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
    List<ProductSelectionDto> getAll();

    /**
     * Save.
     *
     * @param model the model
     * @param file  the file
     * @return the product
     * @throws IOException Signals that an I/O exception has occurred.
     */
    Product save(String model, MultipartFile file) throws IOException;


    /**
     * Gets the spec unit.
     *
     * @param id the id
     * @return the spec unit
     */
    Set<SpecUnitSelectionDto> getSpecUnit(Long id);

    /**
     * Gets the product by selection.
     *
     * @param product the product
     * @return the product by selection
     */
    Product getProductBySelection(ProductSelectionDto product);

    /**
     * Gets the all for seletion with producer.
     *
     * @return the all for seletion with producer
     */
    Set<ProductSelectionDto> getAllForSeletionWithProducer();

    /**
     * Save import product.
     *
     * @param productId the product id
     * @param branchId  the branch id
     * @param amount    the amount
     * @param price     the price
     * @param specUnit  the spec unit
     */
    void saveImportProduct(Long productId, Long branchId, Double amount, Double price, Long specUnit);

    /**
     * Gets the product for request.
     *
     * @param branchDto the branch dto
     * @return the product for request
     */
    List<ProductSelectionDto> getProductForRequest(BranchDto branchDto);

    /**
     * Gets the amount of product.
     *
     * @param productId the product id
     * @param branchId  the branch id
     * @return the amount of product
     */
    Double getAmountOfProduct(Long productId, Long branchId);

    /**
     * Gets the product by id.
     *
     * @param id the id
     * @return the product by id
     */
    Product getProductById(Long id);

    /**
     * Save exchange.
     */
    void saveExchange(Long branchExchangeId, Long branchRecieveId, Long productId, Double amount);

    /**
     * Get all product by branch.
     *
     * @param branchDto the {@link BranchDto}
     * @return list {@link ProductOfBranchDto}
     */
    List<ProductOfBranchDto> getAllProductByBranch(BranchDto branchDto);

    PriceHistory getPriceByBranch(Long productId);

    Double pushAmount(SpecUnit specUnit, ProductOfBranchDao productOfBranch, Double amount, Product product);

    Double pushAmount(SpecUnit specUnit, Double amount, Product product);

    void updateProductOfBranch(Long productId, Long branchId, Double amount);

    Double getInventory(ProductAndSpecUnit productAndSpecUnit);

    ProductDtoForExport getProductForExport(Long id);

    List<ProductSelectionDto> searchProductByKeyWord(String keyWord);

    List<BranchDto> searchBranchHasProduct(ProductAndLocationDto productAndLocationDto);

    List<ProductDto> searchProductByKeyWordAndProducer(ProductSearchDto productSearchDto);

    List<ProductDto> searchProductByKeyWordReturnListProductDto(String keyWord);

    List<ProductDto> searchProductByProducer(Long producerId);

    List<ProductDto> searchProduct();

    List<Product> findAllByProductOfBranch_Amount(SearchProductOnStoreDto searchProductOnStoreDto);

    List<ProductDto> covert(List<Product> products);

}
