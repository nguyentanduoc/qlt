package com.vn.ctu.qlt.service.impl;

import com.google.gson.Gson;
import com.vn.ctu.qlt.dao.PriceHistoryDao;
import com.vn.ctu.qlt.dao.ProductOfBranchDao;
import com.vn.ctu.qlt.dto.*;
import com.vn.ctu.qlt.dto.direction.DirectionSearch;
import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.exception.DivRemainderException;
import com.vn.ctu.qlt.exception.ProductException;
import com.vn.ctu.qlt.exception.SpecOfProductException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.repository.ProductRepository;
import com.vn.ctu.qlt.service.*;
import com.vn.ctu.qlt.sevice.mapper.PriceHistoryMapper;
import com.vn.ctu.qlt.sevice.mapper.ProductMapper;
import com.vn.ctu.qlt.sevice.mapper.ProductOfBranchMapper;
import liquibase.util.file.FilenameUtils;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

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

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * The upload dir.
     */
    @Value("${file.upload-dir}")
    private String uploadDir;

    /**
     * The img dir.
     */
    @Value("${file.img}")
    private String imgDir;

    /**
     * The product repository.
     */
    @Autowired
    private ProductRepository productRepository;

    /**
     * The spec unit service.
     */
    @Autowired
    private SpecUnitService specUnitService;

    /**
     * The producer service.
     */
    @Autowired
    private ProducerService producerService;

    /**
     * The unit service.
     */
    @Autowired
    private UnitService unitService;

    /**
     * The jdbc template.
     */
    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * The price history mapper.
     */
    @Autowired
    private PriceHistoryMapper priceHistoryMapper;

    /**
     * The product of branch mapper.
     */
    @Autowired
    private ProductOfBranchMapper productOfBranchMapper;

    @Autowired
    private BranchService branchService;

    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private ShopService shopService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private DirectionsService directionsService;

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
        product.setProducer(producerService.getByProducerSelection(productDto.getProducerSeletion()));
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
        return productOptional.orElse(null);
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
     * @param shopId    the branch id
     * @param price     the price
     */
    /*
     * (non-Javadoc)
     *
     * @see com.vn.ctu.qlt.service.ProductService#saveImportProduct(java.lang.Long,
     * java.lang.Long, java.lang.Double)
     */
    public void savePriceHistory(Long productId, Long shopId, Double price) {
        try {
            Optional<Shop> shopOptional = shopService.findById(shopId);
            if (!shopOptional.isPresent()) throw new BadRequestException("Không tìm thấy Cửa hàng");
            Shop shop = shopOptional.get();
            List<PriceHistoryDao> pricesHistory = selectPriceHistory(productId, shop.getId());
            if (pricesHistory.size() > 0) {
                PriceHistoryDao priceHistory = pricesHistory.get(0);
                if (!priceHistory.getPrice().equals(price)) {
                    insertHistory(PriceHistoryDao.builder().shopId(shop.getId())
                            .productId(productId).date(new Date())
                            .price(price).build());
                }
            } else {
                insertHistory(PriceHistoryDao.builder().shopId(shop.getId())
                        .productId(productId).date(new Date())
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
     * @param shopId    the branch id
     * @return the list
     */
    private List<PriceHistoryDao> selectPriceHistory(Long productId, Long shopId) {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append(
                    "select ma_san_pham, ma_cua_hang, ngay_thay_doi, don_gia " +
                            "from lich_su_gia where ma_san_pham = ? and ma_cua_hang = ? " +
                            "order by ngay_thay_doi desc limit 1");
            return jdbcTemplate.query(sql.toString(), new Object[]{productId, shopId}, priceHistoryMapper);
        } catch (DataAccessException e) {
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
            param.add(dao.getShopId());
            param.add(dao.getDate());
            param.add(dao.getPrice());
            StringBuilder sql = new StringBuilder();
            sql.append(
                    "INSERT INTO public.lich_su_gia (ma_san_pham, ma_cua_hang, ngay_thay_doi, don_gia) VALUES(?, ?, ?, ?)");
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
        SpecUnit specUnit;
        try {
            ProductOfBranchDao productOfBranch = selectProductOfBranch(productId, branchId);
            Optional<Product> productOptional = productRepository.findById(productId);
            if (!productOptional.isPresent()) throw new ProductException("Sản phẩm không tồn tại");
            product = productOptional.get();
            specUnit = specUnitService.getById(spectUnit);
            if (productOfBranch != null) {
                updateProductOfBranch(productId, branchId,
                        pushAmount(specUnit, productOfBranch, amount, product));
            } else {
                insertProductOfBranch(productId, branchId, pushAmount(specUnit, amount, product));
            }
        } catch (DataAccessException e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

    /**
     * Push amount.
     *
     * @param specUnit        the spec unit
     * @param productOfBranch the product of branch
     * @param amount          the amount
     * @param product         the product
     * @return the Double
     */
    @Override
    public Double pushAmount(SpecUnit specUnit, ProductOfBranchDao productOfBranch, Double amount, Product product) {
        double amountCount;
        SpecUnit straightUnit;
        if (product.getUnit().getId().equals(specUnit.getUnitIn().getId())) {
            amountCount = productOfBranch.getAmount() + amount;
        } else {
            if (product.getUnit().getId().equals(specUnit.getUnitOut().getId())) {
                amountCount = (amount * specUnit.getAmount()) + productOfBranch.getAmount();
            } else {
                List<SpecUnit> specUnitsOfProduct = product.getSpecUnits();
                straightUnit = specUnitsOfProduct.stream()
                        .filter(predicate -> specUnit.getUnitIn().equals(predicate.getUnitOut())).findAny().orElse(null);
                if (straightUnit != null) {
                    amountCount = productOfBranch.getAmount() + amount / straightUnit.getAmount().doubleValue();
                } else {
                    logger.error("pushAmount: not found straightUnit");
                    throw new SpecOfProductException("Định nghĩa dư liệu không tồn tại");
                }
            }
        }
        return amountCount;
    }

    /**
     * Push amount.
     *
     * @param specUnit the spec unit
     * @param amount   the amount
     * @param product  the product
     * @return the double
     */
    @Override
    public Double pushAmount(SpecUnit specUnit, Double amount, Product product) {
        Unit unit = product.getUnit();
        if (unit.equals(specUnit.getUnitIn())) {
            return amount;
        } else if (unit.equals(specUnit.getUnitOut())) {
            return (amount * specUnit.getAmount());
        } else {
            return amount / specUnit.getAmount();
        }
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
            List<ProductOfBranchDao> result = jdbcTemplate.query(
                    "select ma_san_pham, ma_chi_nhanh, so_luong from san_pham_chi_nhanh where ma_san_pham = ? and ma_chi_nhanh = ?",
                    new Object[]{productId, branchId}, productOfBranchMapper);
            if (result.size() > 0) {
                return result.get(0);
            } else {
                return null;
            }
        } catch (DataAccessException e) {
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
            String sql = "INSERT INTO public.san_pham_chi_nhanh(ma_san_pham, ma_chi_nhanh, so_luong)VALUES(?, ?, ?)";
            jdbcTemplate.update(sql, productId, branchId, amount);
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
    public void updateProductOfBranch(Long productId, Long branchId, Double amount) {
        try {
            String sql = "UPDATE public.san_pham_chi_nhanh SET so_luong= ? WHERE ma_san_pham=? AND ma_chi_nhanh=?;";
            jdbcTemplate.update(sql, amount, productId, branchId);
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
            Branch branch = branchService.getBranchById(branchId);
            Shop shop = branch.getShop();
            saveProductOfBranch(productId, branchId, amount, specUnit);
            savePriceHistory(productId, shop.getId(), price);
        } catch (DivRemainderException e) {
            logger.error("saveImportProduct" + e.getMessage());
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

            List<Product> products = jdbcTemplate.query(sql.toString(), new Object[]{mainBranch.getId()}, productMapper);

            if (products.size() > 0) {
                List<ProductSelectionDto> result = new ArrayList<ProductSelectionDto>();
                products.forEach(action -> result.add(
                        new ProductSelectionDto(action.getId(),
                                action.getProductName() + "[" + action.getProducer().getProducerName() + "]")));
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
            StringBuilder sql = new StringBuilder();
            sql.append("select spccn.so_luong ");
            sql.append("from san_pham sp inner join san_pham_chi_nhanh spccn on sp.ma = spccn.ma_san_pham ");
            sql.append("where spccn.ma_chi_nhanh = ? and sp.ma = ? ");
            return jdbcTemplate.queryForObject(sql.toString(), new Object[]{mainBranch.getId(), productId}, Double.class);
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public Product getProductById(Long id) {
        Optional<Product> productOption = productRepository.findById(id);
        if (!productOption.isPresent()) throw new BadRequestException("Sản phẩm không tồn tại");
        return productOption.get();
    }

    @Override
    public void saveExchange(Long branchExchangeId, Long branchRecieveId, Long productId, Double amount) {
        try {
            ProductOfBranchDao productOfBranchExchange = selectProductOfBranch(productId, branchExchangeId);
            updateProductOfBranch(productId, branchExchangeId, productOfBranchExchange.getAmount() - amount);

            ProductOfBranchDao productOfBranchRecieve = selectProductOfBranch(productId, branchRecieveId);
            if (productOfBranchRecieve != null) {
                updateProductOfBranch(productId, branchRecieveId, productOfBranchRecieve.getAmount() + amount);
            } else {
                insertProductOfBranch(productId, branchRecieveId, amount);
            }
        } catch (Exception e) {
            throw e;
        }
    }

    @Override
    public List<ProductOfBranchDto> getAllProductByBranch(BranchDto branchDto) {
        Branch branch = branchService.getBranchById(branchDto.getId());
        List<ProductOfBranch> productModel = branch.getProductsOfBranch();
        List<ProductOfBranchDto> productsOfBranchDto = new ArrayList<>();
        productModel.forEach(element -> {
            String productName = element.getProduct().getProductName() + "[" + element.getProduct().getProducer().getProducerName() + "]";
            ProductSelectionDto selectionDto = new ProductSelectionDto(element.getProduct().getId(), productName);
            productsOfBranchDto.add(new ProductOfBranchDto(selectionDto, element.getAmount()));
        });
        return productsOfBranchDto;
    }

    @Override
    public PriceHistory getPriceByBranch(Long productId) {
        Product product = getProductById(productId);
        List<PriceHistory> priceHistories = product.getPriceHistorys();
        priceHistories.sort(Comparator.comparing(PriceHistory::getDate));
        return priceHistories.get(0);
    }

    @Override
    public Double getInventory(ProductAndSpecUnit productAndSpecUnit) {
        Product product = getProductById(productAndSpecUnit.getProductId());
        SpecUnit specUnit = specUnitService.getById(productAndSpecUnit.getSpecUnitId());
        Branch branch = branchService.getBranchById(productAndSpecUnit.getBranchId());
        List<ProductOfBranch> productsOfBranch = branch.getProductsOfBranch();
        ProductOfBranch productOfBranch = productsOfBranch.stream().filter(predicate -> predicate.getProduct().equals(product)).findAny().orElse(null);
        Unit unitProduct = product.getUnit();
        assert productOfBranch != null;
        if (specUnit.getUnitIn().equals(unitProduct)) {
            return productOfBranch.getAmount();
        } else if (unitProduct.equals(specUnit.getUnitOut())) {
            return (productOfBranch.getAmount() / specUnit.getAmount());
        } else {
            return productOfBranch.getAmount() * specUnit.getAmount();
        }
    }

    @Override
    public ProductDtoForExport getProductForExport(Long id) {
        ProductDtoForExport productDtoForExport = new ProductDtoForExport();
        Product product = getProductById(id);
        Set<SpecUnitDto> specUnitsDto = new HashSet<>();
        BeanUtils.copyProperties(product, productDtoForExport);
        product.getSpecUnits().forEach(action -> {
            SpecUnitDto specUnitDto = new SpecUnitDto();
            UnitDto unitOut = new UnitDto();
            UnitDto unitIn = new UnitDto();
            BeanUtils.copyProperties(action.getUnitOut(), unitOut);
            BeanUtils.copyProperties(action.getUnitIn(), unitIn);
            BeanUtils.copyProperties(action, specUnitDto);
            specUnitDto.setUnitIn(unitIn);
            specUnitDto.setUnitOut(unitOut);
            specUnitsDto.add(specUnitDto);
        });
        UnitDto unit = new UnitDto();
        BeanUtils.copyProperties(product.getUnit(), unit);
        productDtoForExport.setSpecUnits(specUnitsDto);
        productDtoForExport.setUnit(unit);
        return productDtoForExport;
    }

    @Override
    public List<ProductSelectionDto> searchProductByKeyWord(String keyWord) {
        List<Product> products = productRepository.searchKeyWord(keyWord);
        List<ProductSelectionDto> response = new ArrayList<>();
        products.forEach(product -> {
            ProductSelectionDto productSelectionDto = new ProductSelectionDto();
            String productName = product.getProductName() + " [" + product.getProducer().getProducerName() + "]";
            productSelectionDto.setLabel(productName);
            productSelectionDto.setValue(product.getId());
            response.add(productSelectionDto);
        });
        return response;
    }

    @Override
    public List<BranchDto> searchBranchHasProduct(ProductAndLocationDto productAndLocationDto) {
        Product products = getProductById(productAndLocationDto.getProduct().getValue());
        List<ProductOfBranch> productOfBranches = products.getProductsOfBranch();
        List<BranchDto> branchesDto = new ArrayList<>();
        productOfBranches.forEach(productOfBranch -> {
            if (productOfBranch.getAmount() > 0) {
                Branch branch = productOfBranch.getBranch();
                CoordinateDto coordinateDto = new CoordinateDto();
                coordinateDto.setLatitude(branch.getLatitude());
                coordinateDto.setLongitude(branch.getLongitude());
                DirectionSearch directionSearch = directionsService.searchDirection(productAndLocationDto.getCoordinate(), coordinateDto);
                BranchDto branchDto = modelMapper.map(branch, BranchDto.class);
                branchDto.setDistance(directionSearch.getRoutes().get(0).getDistance() / 1000.0);
                branchesDto.add(branchDto);
            }
        });
        branchesDto.sort(Comparator.comparing(BranchDto::getDistance));
        return branchesDto;
    }

    @Override
    public List<ProductDto> searchProductByKeyWordAndProducer(ProductSearchDto productSearchDto) {
        List<Product> products = productRepository.searchKeyWord(productSearchDto.getProductName());
        List<ProductDto> productsDto = new ArrayList<>();
        for (Product product : products) {
            if (product.getProducer().getId().equals(productSearchDto.getProducerId())) {
                ProductDto productDto = modelMapper.map(product, ProductDto.class);
                productsDto.add(productDto);
            }
        }
        return productsDto;
    }

    @Override
    public List<ProductDto> searchProductByProducer(Long producerId) {
        Producer producer = producerService.getProducerById(producerId);
        List<ProductDto> productsDto = new ArrayList<>();
        List<Product> products = productRepository.findAllByProducer(producer);
        for (Product product : products) {
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            productsDto.add(productDto);
        }
        return productsDto;
    }

    @Override
    public List<ProductDto> searchProductByKeyWordReturnListProductDto(String keyWord) {
        List<Product> products = productRepository.searchKeyWord(keyWord);
        return covert(products);
    }

    private List<ProductDto> covert(List<Product> products){
        List<ProductDto> productsDto = new ArrayList<>();
        for (Product product : products) {
            ProductDto productDto = modelMapper.map(product, ProductDto.class);
            productsDto.add(productDto);
        }
        return productsDto;
    }

    @Override
    public List<ProductDto> searchProduct(){
        List<Product> products = productRepository.findAll();
        return covert(products);
    }

}
