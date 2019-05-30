package com.vn.ctu.qlt.repository;

import com.vn.ctu.qlt.model.Producer;
import com.vn.ctu.qlt.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>  {

    @Query("select p from Product p where p.productName like CONCAT('%',:keyWord,'%')")
    List<Product> searchKeyWord(@Param("keyWord") String keyWord);

    List<Product> findAllByProducer(Producer producer);
}
