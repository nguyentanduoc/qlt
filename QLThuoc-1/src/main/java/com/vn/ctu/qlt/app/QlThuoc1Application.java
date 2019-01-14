package com.vn.ctu.qlt.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.vn.ctu.qlt.app.config.AppProperties;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
public class QlThuoc1Application {

	public static void main(String[] args) {
		SpringApplication.run(QlThuoc1Application.class, args);
	}

}

