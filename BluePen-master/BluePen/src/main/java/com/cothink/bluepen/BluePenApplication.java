package com.cothink.bluepen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class BluePenApplication {

	public static void main(String[] args) {
		SpringApplication.run(BluePenApplication.class, args);
	}

}
