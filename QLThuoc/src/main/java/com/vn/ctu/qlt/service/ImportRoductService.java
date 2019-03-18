package com.vn.ctu.qlt.service;

import java.util.Set;

import com.vn.ctu.qlt.dto.ImportProductDto;
import com.vn.ctu.qlt.model.Employee;

public interface ImportRoductService {

	public void save(Set<ImportProductDto> importProductsDto, Employee employee);
}
