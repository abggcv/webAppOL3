package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.dao.TestWebAppDAO;
import com.example.domain.Grid;
import com.example.domain.Person;

@SuppressWarnings("unused")
@Controller
@RequestMapping("/")
public class TestController {
	@Autowired
	TestWebAppDAO testDAO;

	@RequestMapping(value = "home", method = RequestMethod.GET)
	///@RequestMapping(value = "test", method = RequestMethod.GET)
	public String indexDefault(Model model){
		
		//List<Grid> gridList = testDAO.getGridRecords();
		//model.addAllAttributes(gridList);
		List<Person> personList = testDAO.getAllPersons();
		model.addAllAttributes(personList);
		///model.addAttribute(personList.get(0));
		//System.out.println(model.);
		///return "test";
		return "home";
	}
}
