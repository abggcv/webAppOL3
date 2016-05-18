package com.example;

import org.springframework.boot.ResourceBanner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;

@SpringBootApplication
public class TestwebappApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(TestwebappApplication.class);
        app.setBanner(new ResourceBanner(new ClassPathResource("testwebapp_banner.txt")));
        app.run(args);
	}
}
