package com.vn.ctu.qlt.controller;

import java.time.YearMonth;
import java.util.*;

import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.*;
import com.vn.ctu.qlt.service.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.vn.ctu.qlt.dto.BranchDto;
import com.vn.ctu.qlt.dto.QueryBranchDto;
import com.vn.ctu.qlt.security.AuthenticationFacade;

import javax.xml.crypto.Data;

/**
 * The Class BranchController.
 *
 * @author NTDSIVAL
 * @since 06-03-2019
 */
@Controller
public class BranchController {

    /**
     * The logger.
     */
    private final Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * The branch service.
     */
    @Autowired
    private BranchService branchService;

    @Autowired
    private AuthenticationFacade authenticationFacade;


    @Autowired
    private ShopService shopService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ImportProductService importProductService;

    @Autowired
    private BillRequestService billRequestService;

    @Autowired
    private ExportService exportService;

    /**
     * Save.
     *
     * @param branch the branch
     */
    @PostMapping(path = "/api/branch/save")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Page<BranchDto>> save(@RequestBody BranchDto branch) {
        logger.debug("/api/branch/save");
        try {
            branchService.save(branch);
            PageRequest pageRequest = PageRequest.of(0, 5);
            Page<BranchDto> pageBranch = branchService.getBranhByDirector(authenticationFacade.getIdAccount(), pageRequest);
            return ResponseEntity.ok().body(pageBranch);
        } catch (DataIntegrityViolationException e) {
            logger.error(e.getMessage());
            throw e;
        }
    }

    /**
     * Select.
     *
     * @return the response entity
     */
    @PostMapping(path = "/api/branch/select")
    public ResponseEntity<List<BranchDto>> select() {
        logger.debug("/api/branch/select");
        try {
            Employee employee = authenticationFacade.getEmployee();
            Optional<Shop> shopOptional = shopService.findShopByDirector(employee);
            if (!shopOptional.isPresent()) throw new BadRequestException("Không tìm thấy cửa hàng");
            Set<Branch> branchs = shopOptional.get().getBranchs();
            List<BranchDto> branchDtos = new ArrayList<>();
            for (Branch branch : branchs) {
                branchDtos.add(modelMapper.map(branch, BranchDto.class));
            }
            return ResponseEntity.ok().body(branchDtos);
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * Delete.
     *
     * @param keys the keys
     * @return the response entity
     */
    @PostMapping(path = "/api/branch/delete")
    public ResponseEntity<Void> delete(@RequestBody Long[] keys) {
        logger.debug("/api/branch/delete");
        branchService.deleteAll(keys);
        return new ResponseEntity(HttpStatus.OK);
    }

    /**
     * Select branch by director.
     *
     * @param idDirector the id director
     * @return the response entity
     */
    @PostMapping(path = "/api/branch/select-branch-by-director")
    public ResponseEntity<Set<BranchDto>> selectBranchByDirector(@RequestBody Long idDirector) {
        logger.debug("/api/branch/select-branch-by-director");
        return ResponseEntity.ok().body(branchService.selectBranchByDirectorDto(idDirector));
    }

    @PostMapping(path = "/api/branch/count-member-of-branch")
    public ResponseEntity<Integer> countMemberObBranch(@RequestBody BranchDto branchDto) {
        return ResponseEntity.ok().body(branchService.countMemberOfBranch(branchDto));
    }

    @PostMapping(path = "/api/branch/search")
    public ResponseEntity search(@RequestBody String nameBranch) {
        PageRequest pageRequest = PageRequest.of(1, 5);
        return ResponseEntity.ok().body(branchService.search(nameBranch, pageRequest));
    }

    @PostMapping(path = "/api/branch/report-chart")
    public ResponseEntity reportChart(@RequestBody BranchDto branchDto) {
        GregorianCalendar date = new GregorianCalendar();
        Calendar calendar = Calendar.getInstance();
        int month = date.get(Calendar.MONTH);
        int numberYear = calendar.get(Calendar.YEAR);
        List<String> strings = new ArrayList<>();
        List<Double> datasImport = new ArrayList<>();
        List<Double> datasExport = new ArrayList<>();
        List<Double> datasRequest = new ArrayList<>();

        for (int i = 0; i <= month; i++) {
            strings.add("Tháng " + (i + 1));
            YearMonth yearMonthObject = YearMonth.of(numberYear, month);
            int daysInMonth = yearMonthObject.lengthOfMonth();
            Date dateStart = new GregorianCalendar(numberYear, i, 1).getTime();
            Date dateEnd = new GregorianCalendar(numberYear, i, daysInMonth).getTime();
            List<Date> dates = new ArrayList<>();
            dates.add(dateStart);
            dates.add(dateEnd);
            if (branchDto.getIsMain()) {
                Double data = 0d;
                List<BillImport> billImports = importProductService.findBillImportBetween(dates, branchDto);
                if (billImports.size() > 0) {
                    for (BillImport billImport : billImports) {
                        List<DetailBillImport> detailBillImports = billImport.getDetailBillImports();
                        if (detailBillImports.size() > 0) {
                            for (DetailBillImport detailBillImport : detailBillImports) {
                                data += detailBillImport.getAmount();
                            }
                        }
                    }
                }
                datasImport.add(data);
            } else {
                Double data = 0d;
                List<BillRequest> billRequests = billRequestService.searchBetweenDateCreatedAndAccept(dates, branchDto);
                if (billRequests.size() > 0) {
                    for (BillRequest billRequest : billRequests) {
                        List<DetailBillRequest> detailBillRequests = billRequest.getDetailBillRequests();
                        if (detailBillRequests.size() > 0) {
                            for (DetailBillRequest detailBillRequest : detailBillRequests) {
                                data += detailBillRequest.getAmount();
                            }
                        }
                    }
                }
                datasRequest.add(data);
            }
            List<BillExport> billExports = exportService.findBillExportDateCreatedBetween(dates, branchDto);
            Double data = 0d;
            if (billExports.size() > 0) {
                for (BillExport billExport : billExports) {
                    List<DetailBillExport> detailBillExports = billExport.getDetailBillExports();
                    if (detailBillExports.size() > 0) {
                        for (DetailBillExport detailBillExport : detailBillExports) {
                            data += detailBillExport.getAmount();
                        }
                    }
                }
            }
            datasExport.add(data);
        }
        Map<String, Object> response = new HashMap<>();
        Map<String, Object> data = new HashMap<>();
        data.put("datasExport", datasExport);
        data.put("datasImport", datasImport);
        data.put("datasRequest", datasRequest);
        response.put("labels", strings);
        response.put("dataSet", data);
        return ResponseEntity.ok().body(response);
    }
}
