package com.vn.ctu.qlt.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.vn.ctu.qlt.dto.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.exception.NullRequestException;
import com.vn.ctu.qlt.model.BillRequest;
import com.vn.ctu.qlt.model.Branch;
import com.vn.ctu.qlt.model.DetailBillRequest;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.repository.BillRequestRepository;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import com.vn.ctu.qlt.service.BillRequestService;
import com.vn.ctu.qlt.service.BranchService;
import com.vn.ctu.qlt.service.ProductService;

@Service
public class BillRequestServiceImpl implements BillRequestService {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    private BillRequestRepository billRequestRepository;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @Autowired
    private BranchService branchService;

    @Autowired
    private ProductService productService;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public void save(ImportProductDto data) {
        try {
            Employee employeeRequest = iAuthenticationFacade.getEmployee();
            Branch branch = branchService.getBranchById(data.getBranch().getId());
            Branch branchMain = branchService.getMainBranchByBranch(branch.getId());

            BillRequest billRequest = new BillRequest();
            billRequest.setEmployeeRequest(employeeRequest);
            billRequest.setBranchRequest(branch);
            billRequest.setBranchMain(branchMain);
            billRequest.setDateRequested(new Date());
            billRequest.setIsSeen(false);
            billRequest.setIsReceive(false);
            billRequest.setNoteRequest(data.getNoteRequest());
            billRequest.setIsAccept(false);
            billRequest.setIsDone(false);
            billRequest.setIsCancel(false);

            data.getData().forEach(action -> {
                Product product = productService.getProductById(action.getProduct().getValue());
                DetailBillRequest detailBillRequest = new DetailBillRequest();
                detailBillRequest.setAmount(action.getAmount());
                detailBillRequest.setBillRequest(billRequest);
                detailBillRequest.setProduct(product);
                billRequest.getDetailBillRequests().add(detailBillRequest);
            });
            billRequestRepository.save(billRequest);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public List<BillRequestDto> getBillRequest(BillRequestWithConditionDto dto) {
        try {

            Branch branch = branchService.getBranchById(dto.getBranch().getId());
            BillRequestConditionDto conditionDto = dto.getCondition();
            List<BillRequest> billsRequest = billRequestRepository
                    .findByIsSeenAndIsReceiveAndIsAcceptAndIsDoneAndIsCancelAndBranchMain(conditionDto.getIsSeen(),
                            conditionDto.getIsReceive(), conditionDto.getIsAccept(), conditionDto.getIsDone(),
                            conditionDto.getIsCancel(), branch);
            List<BillRequestDto> result = new ArrayList<BillRequestDto>();
            billsRequest.forEach(action -> {
                BillRequestDto responseDto = new BillRequestDto();
                BeanUtils.copyProperties(action, responseDto);
                responseDto.setEmployeeRequest(action.getEmployeeRequest().getNameEmployee());
                responseDto.setBranch(action.getBranchRequest().getName());
                result.add(responseDto);
            });
            return result;
        } catch (NullPointerException e) {
            throw new NullRequestException("Không có dữ liệu");
        } catch (Exception e) {
            logger.debug(e.getMessage());
            throw e;
        }

    }

    @Override
    public List<DetailRequestDto> getDetail(Long id) {
        try {
            BillRequest billRequest = getBillRequestById(id);
            List<DetailBillRequest> detailBillRequests = billRequest.getDetailBillRequests();
            List<DetailRequestDto> result = new ArrayList<DetailRequestDto>();

            detailBillRequests.forEach(action -> {
                DetailRequestDto dto = new DetailRequestDto();
                Product product = action.getProduct();
                StringBuilder productName = new StringBuilder(product.getProductName()).append(" [");
                productName.append(product.getProducer().getProducerName()).append("]");

                dto.setAmount(action.getAmount());
                dto.setProduct(productName.toString());
                dto.setUnit(product.getUnit().getUnitName());
                result.add(dto);
            });
            billRequest.setIsSeen(true);
            billRequestRepository.save(billRequest);
            return result;

        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

    private BillRequest getBillRequestById(Long id) {
        Optional<BillRequest> billRequestOptional = billRequestRepository.findById(id);
        if (!billRequestOptional.isPresent()) throw new BadRequestException("Không tìm thấy Phiếu yêu cầu");
        return billRequestOptional.get();
    }

    @Override
    public void accept(Long id) {
        try {
            BillRequest entity = getBillRequestById(id);
            List<DetailBillRequest> detailBillRequests = entity.getDetailBillRequests();
            detailBillRequests.forEach(action -> {
                Product product = action.getProduct();
                productService.saveExchange(entity.getBranchMain().getId(), entity.getBranchRequest().getId(),
                        product.getId(), action.getAmount());
            });
            Employee emp = iAuthenticationFacade.getEmployee();
            entity.setDateExchanged(new Date());
            entity.setEmployeeAccept(emp);
            entity.setIsAccept(true);
            billRequestRepository.save(entity);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public void cancel(Long id) {
        try {
            Employee emp = iAuthenticationFacade.getEmployee();
            BillRequest entity = getBillRequestById(id);
            entity.setIsCancel(true);
            entity.setEmployeeAccept(emp);
            billRequestRepository.save(entity);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public List<BillRequest> findAll() {
        return billRequestRepository.findAll();
    }

    @Override
    public Optional<BillRequest> findById(Long id) {
        return billRequestRepository.findById(id);
    }

    @Override
    public List<BillRequest> findByDateCreated(Date date) {
        return billRequestRepository.findAllByDateRequested(date);
    }

    @Override
    public List<BillRequestDto> convertList(List<BillRequest> billRequests) {
        List<BillRequestDto> billRequestsDto = new ArrayList<>();
        for (BillRequest billRequest : billRequests) {
            billRequestsDto.add(modelMapper.map(billRequest, BillRequestDto.class));
        }
        return billRequestsDto;
    }

    @Override
    public BillRequestDto convertObject(BillRequest billRequest) {
        return modelMapper.map(billRequest, BillRequestDto.class);
    }

    @Override
    public List<BillRequestSearchDto> searchBetweenDateCreated(SearchRequestProductDto searchRequestProductDto) {
        List<Date> dates = searchRequestProductDto.getDateCreated();
        Branch branch = branchService.getBranchById(searchRequestProductDto.getBranchDto().getId());
        List<BillRequest> billRequests = billRequestRepository.findAllByDateRequestedBetweenAndBranchRequest(dates.get(0), dates.get(1), branch);
        List<BillRequestSearchDto> billRequestSearchDtos = new ArrayList<>();
        for (BillRequest billRequest : billRequests) {
            billRequestSearchDtos.add(modelMapper.map(billRequest, BillRequestSearchDto.class));
        }
        return billRequestSearchDtos;
    }

    @Override
    public List<BillRequest> searchBetweenDateCreatedAndAccept(List<Date> dates, BranchDto branchDto) {
        Branch branch = branchService.getBranchById(branchDto.getId());
        return billRequestRepository.findAllByDateRequestedBetweenAndBranchRequestAndIsAccept(dates.get(0), dates.get(1), branch, true);
    }

}
