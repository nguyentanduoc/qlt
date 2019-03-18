package com.vn.ctu.qlt.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.JsonSyntaxException;
import com.vn.ctu.qlt.dto.SpecUnitSelectionDto;
import com.vn.ctu.qlt.exception.FileEmpty;
import com.vn.ctu.qlt.exception.FileStorageException;
import com.vn.ctu.qlt.model.Product;
import com.vn.ctu.qlt.service.ProducerService;
import com.vn.ctu.qlt.service.ProductService;
import com.vn.ctu.qlt.service.SpecUnitService;
import com.vn.ctu.qlt.service.UnitService;

/**
 * The Class ProductController.
 *
 * @author ntduoc
 * @since 2019-03-13
 */
@RestController
public class ProductController {

	/** The product service. */
	@Autowired
	private ProductService productService;

	/** The spec unit service. */
	@Autowired
	private SpecUnitService specUnitService;
	
	@Autowired
	private UnitService unitService;
	
	@Autowired
	private ProducerService producerService;

	/**
	 * Inits the.
	 *
	 * @return the response entity
	 */
	@PostMapping(path = "/api/product/init")
	public ResponseEntity<Map<String, Object>> init() {
		Map<String, Object> response = new HashMap<>();
		response.put("specUnits", specUnitService.getAllForSelection());
		response.put("units", unitService.getAllForSelection());
		response.put("producers", producerService.getAllForSelection());
		return ResponseEntity.ok().body(response);
	}

	/**
	 * Save.
	 *
	 * @param model the model
	 * @param file the file
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@PostMapping(path = "/api/product/save")
	public ResponseEntity<Product> save(@RequestParam("model") String model,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

		try {
			if (file.isEmpty()) {
				throw new FileEmpty("Failed to store empty file");
			} else {
				return ResponseEntity.ok().body(productService.save(model, file));
			}
		} catch (IOException e) {
			String msg = String.format("Failed to store file", file.getName());
			throw new FileStorageException(msg, e.getMessage());
		} catch (JsonSyntaxException e) {
			throw e;
		}
	}
	
	/**
	 * Gets the spec unit.
	 *
	 * @param id the id
	 * @return the spec unit
	 */
	@PostMapping(path="/api/product/getSpecUnit")
	public ResponseEntity<Set<SpecUnitSelectionDto>> getSpecUnit(@RequestBody Long id){
		return ResponseEntity.ok().body(productService.getSpecUnit(id));
	}
}
