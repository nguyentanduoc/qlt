package com.vn.ctu.qlt.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.vn.ctu.qlt.exception.BadRequestException;
import com.vn.ctu.qlt.model.Employee;
import com.vn.ctu.qlt.model.Shop;
import com.vn.ctu.qlt.security.IAuthenticationFacade;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vn.ctu.qlt.dto.ShopDto;
import com.vn.ctu.qlt.service.ShopService;

@RestController
@RequestMapping(path = "/api/shop")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @Autowired
    private IAuthenticationFacade iAuthenticationFacade;

    @PostMapping(path = "/save")
    public ResponseEntity<Map<String, Object>> save(@RequestBody ShopDto shop) {
        return ResponseEntity.ok().body( shopService.save( shop ) );
    }

    @GetMapping(path = "/select")
    public ResponseEntity<Page<ShopDto>> select(String condition, Pageable page) {
        return ResponseEntity.ok().body( shopService.selectDto( condition, page ) );
    }

    @PostMapping(path = "/delete")
    public ResponseEntity delete(@RequestBody Long[] keys) {
        shopService.delete( keys );
        return new ResponseEntity( HttpStatus.OK );
    }

    @GetMapping(path = "/select-all")
    public ResponseEntity<List<ShopDto>> selectAll() {
        return ResponseEntity.ok().body( shopService.selectAllDto() );
    }

    @PostMapping(path = "/get-shop-of-director")
    public ResponseEntity<ShopDto> getShopOfDirector() {
        Employee employee = iAuthenticationFacade.getEmployee();
        Optional<Shop> shop = shopService.findShopByDirector( employee );
        if (!shop.isPresent()) throw new BadRequestException( "Bạn không có Cửa Hàng nào" );
        ShopDto shopDto = new ShopDto();
        BeanUtils.copyProperties( shop.get(), shopDto );
        return ResponseEntity.ok().body( shopDto );
    }

    @PostMapping(path = "/save-shop-director")
    public ResponseEntity<ShopDto> saveShopOfDirector(@RequestBody ShopDto shopDto) {
        Optional<Shop> shopOptional = shopService.findById( shopDto.getId() );
        if (!shopOptional.isPresent()) throw new BadRequestException( "Không tìm thấy cửa hàng" );
        Shop shop = shopOptional.get();
        shop.setNameShop( shopDto.getNameShop() );
        shop.setEstablishAt( shopDto.getEstablishAt() );
        ShopDto response = shopService.save( shop );
        return ResponseEntity.ok().body( response );
    }

    @PostMapping(path = "/get-report-director")
    public ResponseEntity<Map<String, Object>> getReportShop() {
        return ResponseEntity.ok().body( shopService.getReport() );
    }
}
