package com.vn.ctu.qlt.service.impl;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.vn.ctu.qlt.dao.PriceHistoryDao;
import com.vn.ctu.qlt.dao.ProductOfBranchDao;
import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.ProductDto;
import com.vn.ctu.qlt.dto.ProductSelectionDto;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.exception.DivRemainderException;
import com.vn.ctu.qlt.exception.ProductException;
import com.vn.ctu.qlt.exception.SpecOfProductException;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.model.SpecUnit;
import com.vn.ctu.qlt.model.Unit;
import com.vn.ctu.qlt.repository.ProductRepository;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.ProducerService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import com.vn.ctu.qlt.service.UnitService;
import com.vn.ctu.qlt.sevice.mapper.PriceHistoryMapper;
import com.vn.ctu.qlt.sevice.mapper.ProductMapper;
import com.vn.ctu.qlt.sevice.mapper.ProductOfBranchMapper;

import liquibase.util.file.FilenameUtils;

// TODO: Auto-generated Javadoc
/**
 * The Class ProductServiceImpl.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

	/** The logger. */
	private final Logger logger = LoggerFactory.getLogger(getClass());

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

	/** The producer service. */
	@Autowired
	private ProducerService producerService;

	/** The unit service. */
	@Autowired
	private UnitService unitService;

	/** The jdbc template. */
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/** The price history mapper. */
	@Autowired
	private PriceHistoryMapper priceHistoryMapper;

	/** The product of branch mapper. */
	@Autowired
	private ProductOfBranchMapper productOfBranchMapper;

	@Autowired
	private BranchService branchService;
	
	@Autowired
	private ProductMapper productMapper;

	/*
	 * (non-Javadoc)
	 * 
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

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.ProductService#save(java.lang.String,
	 * org.springframework.web.multipart.MultipartFile)
	 */
	@Override
	public Product save(String model, MultipartFile file) throws IOException {
		String extension = FilenameUtils.getExtension(file.getOriginalFilename());
		Gson g = new Gson();
		ProductDto productDto = g.fromJson(model, ProductDto.class);
		List<SpecUnit> specUnits = specUnitService.getAllBySelection(productDto.getSpecUnits());
		// save file
		String fileName = file.getOriginalFilename();
		InputStream is = file.getInputStream();
		Files.copy(is, Paths.get(uploadDir + imgDir + productDto.getProductName() + '.' + extension),
				StandardCopyOption.REPLACE_EXISTING);
		Product product = new Product();
		product.setProductName(productDto.getProductName());
		product.setImage(imgDir + fileName);
		product.setVirtue(productDto.getVirtue());
		product.setSpecUnits(specUnits);
		product.setProducer(producerService.getByProducerSeletion(productDto.getProducer()));
		product.setUnit(unitService.getByUnitSeletion(productDto.getUnit()));
		productRepository.save(product);
		return product;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.ProductService#getSpecUnit(java.lang.Long)
	 */
	@Override
	public Set<SpecUnitSelectionDto> getSpecUnit(Long id) {
		Product product = productRepository.getOne(id);
		List<SpecUnit> specUnits = product.getSpecUnits();
		Set<SpecUnitSelectionDto> specUnitsSelection = new HashSet<>();
		specUnits.forEach(action -> specUnitsSelection.add(new SpecUnitSelectionDto(action)));
		return specUnitsSelection;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.vn.ctu.qlt.service.ProductService#getProductBySelection(com.vn.ctu.qlt.
	 * dto.ProductSelectionDto)
	 */
	@Override
	public Product getProductBySelection(ProductSelectionDto productSelection) {
		Optional<Product> productOptional = productRepository.findById(productSelection.getValue());
		if (productOptional.isPresent()) {
			return productOptional.get();
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.ProductService#getAllForSeletionWithProducer()
	 */
	@Override
	public Set<ProductSelectionDto> getAllForSeletionWithProducer() {
		List<Product> products = productRepository.findAll();
		Set<ProductSelectionDto> productSelectionsDto = new HashSet<>();
		products.forEach(p -> {
			String name = p.getProductName() + " [" + p.getProducer().getProducerName() + "]";
			productSelectionsDto.add(new ProductSelectionDto(p.getId(), name));
		});
		return productSelectionsDto;
	}

	/**
	 * Save price history.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @param price     the price
	 */
	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.ProductService#saveImportProduct(java.lang.Long,
	 * java.lang.Long, java.lang.Double)
	 */
	public void savePriceHistory(Long productId, Long branchId, Double price) {
		// TODO Auto-generated method stub
		try {
			List<PriceHistoryDao> priceHistorys = selectPriceHistory(productId, branchId);
			if (priceHistorys.size() > 0) {
				PriceHistoryDao priceHistory = priceHistorys.get(0);
				if (!priceHistory.getPrice().equals(price)) {
					insertHistory(PriceHistoryDao.builder().branchId(branchId).productId(productId).date(new Date())
							.price(price).build());
				}
			} else {
				insertHistory(PriceHistoryDao.builder().branchId(branchId).productId(productId).date(new Date())
						.price(price).build());
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Select price history.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @return the list
	 */
	private List<PriceHistoryDao> selectPriceHistory(Long productId, Long branchId) {
		try {
			StringBuilder sql = new StringBuilder();
			sql.append(
					"select ma_san_pham, ma_chi_nhanh, ngay_thay_doi, don_gia from lich_su_gia where ma_san_pham = ? and ma_chi_nhanh = ? order by ngay_thay_doi desc limit 1");
			return jdbcTemplate.query(sql.toString(), new Object[] { productId, branchId }, priceHistoryMapper);
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Insert history.
	 *
	 * @param dao the dao
	 */
	private void insertHistory(PriceHistoryDao dao) {
		try {
			List<Object> param = new ArrayList<Object>();
			param.add(dao.getProductId());
			param.add(dao.getBranchId());
			param.add(dao.getDate());
			param.add(dao.getPrice());
			StringBuilder sql = new StringBuilder();
			sql.append(
					"INSERT INTO public.lich_su_gia (ma_san_pham, ma_chi_nhanh, ngay_thay_doi, don_gia) VALUES(?, ?, ?, ?)");
			jdbcTemplate.update(sql.toString(), param.toArray());
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Save product of branch.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @param amount    the amount
	 * @param spectUnit the spect unit
	 */
	private void saveProductOfBranch(Long productId, Long branchId, Double amount, Long spectUnit) {
		Product product;
		Unit unitOfProduct;
		SpecUnit specUnit;
		try {
			ProductOfBranchDao productOfBranch = selectProductOfBranch(productId, branchId);
			Optional<Product> productOptional = productRepository.findById(productId);
			if (productOptional.isPresent()) {
				product = productOptional.get();
				unitOfProduct = product.getUnit();
				specUnit = specUnitService.getById(spectUnit);
				if (productOfBranch != null) {
					updateProductOfBranch(productId, branchId,
							pushAmount(unitOfProduct, specUnit, productOfBranch, amount, product));
				} else {
					insertProductOfBranch(productId, branchId, pushAmount(unitOfProduct, specUnit, amount, product));
				}
			} else {
				throw new ProductException("Sản phẩm không tồn tại");
			}
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Push amount.
	 *
	 * @param unitOfProduct   the unit of product
	 * @param specUnit        the spec unit
	 * @param productOfBranch the product of branch
	 * @param amount          the amount
	 * @param product         the product
	 * @return the double
	 */
	private double pushAmount(Unit unitOfProduct, SpecUnit specUnit, ProductOfBranchDao productOfBranch, Double amount,
			Product product) {
		double countAmount = 0d;
		SpecUnit straightUnit;
		if (unitOfProduct.getId().equals(specUnit.getUnitIn().getId())) {
			countAmount = productOfBranch.getAmount() + amount;
		}
		if (unitOfProduct.getId().equals(specUnit.getUnitOut().getId())) {
			countAmount = (amount * specUnit.getAmount()) + productOfBranch.getAmount();
		} else {
			List<SpecUnit> specUnitsOfProduct = product.getSpecUnits();
			straightUnit = specUnitsOfProduct.stream()
					.filter(predicate -> specUnit.getUnitIn().equals(predicate.getUnitOut())).findAny().orElse(null);
			if (straightUnit != null) {
				double remainder = amount.doubleValue() / straightUnit.getAmount().doubleValue();
				countAmount = productOfBranch.getAmount() + remainder;
			} else {
				throw new SpecOfProductException("Định nghĩa dư liệu không tồn tại");
			}
		}
		return countAmount;
	}

	/**
	 * Push amount.
	 *
	 * @param unitOfProduct the unit of product
	 * @param specUnit      the spec unit
	 * @param amount        the amount
	 * @param product       the product
	 * @return the double
	 */
	private double pushAmount(Unit unitOfProduct, SpecUnit specUnit, Double amount, Product product) {
		double countAmount = 0d;
		SpecUnit straightUnit;
		if (unitOfProduct.getId().equals(specUnit.getUnitIn().getId())) {
			countAmount = amount;
		} else if (unitOfProduct.getId().equals(specUnit.getUnitOut().getId())) {
			countAmount = (amount * specUnit.getAmount());
		} else {
			List<SpecUnit> specUnitsOfProduct = product.getSpecUnits();
			straightUnit = specUnitsOfProduct.stream()
					.filter(predicate -> specUnit.getUnitIn().equals(predicate.getUnitOut())).findAny().orElse(null);
			if (straightUnit != null) {
				double remainder = amount.doubleValue() / straightUnit.getAmount().doubleValue();
				countAmount = remainder;
			} else {
				throw new SpecOfProductException("Định nghĩa dư liệu không tồn tại");
			}
		}
		return countAmount;
	}

	/**
	 * Select product of branch.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @return the product of branch dao
	 */
	private ProductOfBranchDao selectProductOfBranch(Long productId, Long branchId) {
		try {
			StringBuilder sql = new StringBuilder();
			sql.append(
					"select ma_san_pham, ma_chi_nhanh, so_luong from san_pham_chi_nhanh where ma_san_pham = ? and ma_chi_nhanh = ?");
			List<ProductOfBranchDao> result = jdbcTemplate.query(sql.toString(), new Object[] { productId, branchId },
					productOfBranchMapper);
			if (result.size() > 0) {
				return result.get(0);
			} else {
				return null;
			}
			
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Inset product of branch.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @param amount    the amount
	 */
	private void insertProductOfBranch(Long productId, Long branchId, Double amount) {
		try {
			StringBuilder sql = new StringBuilder();
			sql.append("INSERT INTO public.san_pham_chi_nhanh(ma_san_pham, ma_chi_nhanh, so_luong)VALUES(?, ?, ?)");
			jdbcTemplate.update(sql.toString(), new Object[] { productId, branchId, amount });
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Update product of branch.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @param amount    the amount
	 */
	private void updateProductOfBranch(Long productId, Long branchId, Double amount) {
		try {
			StringBuilder sql = new StringBuilder();
			sql.append("UPDATE public.san_pham_chi_nhanh SET so_luong= ? WHERE ma_san_pham=? AND ma_chi_nhanh=?;");
			jdbcTemplate.update(sql.toString(), new Object[] { amount, productId, branchId });
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw e;
		}
	}

	/**
	 * Save import and price history product.
	 *
	 * @param productId the product id
	 * @param branchId  the branch id
	 * @param amount    the amountW
	 * @param price     the price
	 * @param specUnit  the spec unit
	 */
	public void saveImportProduct(Long productId, Long branchId, Double amount, Double price, Long specUnit) {
		try {
			saveProductOfBranch(productId, branchId, amount, specUnit);
			savePriceHistory(productId, branchId, price);
		} catch (DivRemainderException e) {
			throw e;
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.vn.ctu.qlt.service.ProductService#getProductForRequest()
	 */
	@Override
	public List<ProductSelectionDto> getProductForRequest(BranchDto branchDto) {
		try {
			Branch mainBranch = branchService.getMainBranchByBranch(branchDto.getId());
			StringBuilder sql = new StringBuilder();
			sql.append("select sp.ma, sp.ten_san_pham, sp.cong_dung, sp.hinh_anh, sp.ma_nha_san_xuat, sp.don_vi_chuan ");
			sql.append("from san_pham sp inner join san_pham_chi_nhanh spccn on sp.ma = spccn.ma_san_pham ");
			sql.append("where spccn.ma_chi_nhanh = ? and spccn.so_luong > 0");
			
			List<Product> products = jdbcTemplate.query(sql.toString(), new Object[] {mainBranch.getId()}, productMapper);
			
			if(products.size() > 0) {
				List<ProductSelectionDto> result = new ArrayList<ProductSelectionDto>();
				products.forEach(action->{
					result.add(new ProductSelectionDto(action.getId(), action.getProductName() + "[" + action.getProducer().getProducerName() +"]"));
				});
				return result;
			} else {
				throw new BadRequestException("Không tìm thấy sản phẩm");
			}
		} catch (Exception e) {
			logger.error(e.getMessage());
			throw e;
		}

	}

	@Override
	public Double getAmountOfProduct(Long productId, Long branchId) {
		try {
			Branch mainBranch = branchService.getMainBranchByBranch(branchId);
			StringBuilder sql = new  StringBuilder();
			sql.append("select spccn.so_luong ");
			sql.append("from san_pham sp inner join san_pham_chi_nhanh spccn on sp.ma = spccn.ma_san_pham ");
			sql.append("where spccn.ma_chi_nhanh = ? and sp.ma = ? ");
			return jdbcTemplate.queryForObject(sql.toString(),new Object[] {mainBranch.getId(), productId }, Double.class);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public Product getProductById(Long id) {
		Optional<Product> productOption = productRepository.findById(id);
		if(productOption.isPresent()) {
			return productOption.get();
		} else {
			throw new BadRequestException("Sản phẩm không tồn tại");
		}
	}

	@Override
	public void saveExchange(Long branchExchangeId, Long branchRecieveId, Long productId, Double amount) {
		try {
			ProductOfBranchDao productOfBranchExchange = selectProductOfBranch(productId, branchExchangeId);
			updateProductOfBranch(productId, branchExchangeId, productOfBranchExchange.getAmount() - amount);
			
			ProductOfBranchDao productOfBranchRecieve = selectProductOfBranch(productId, branchRecieveId);
			if(productOfBranchRecieve != null) {
				updateProductOfBranch(productId, branchRecieveId, productOfBranchRecieve.getAmount() + amount);
			} else {
				insertProductOfBranch(productId, branchRecieveId, amount);
			}
			
		} catch (Exception e) {
			throw e;
		}
	}
}
