package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.dao.TestWebAppDAO;
import com.example.domain.Grid;
import com.example.domain.Person;

@SuppressWarnings("unused")
@Controller
@RequestMapping("/")
public class TestController {
	@Autowired
	TestWebAppDAO testDAO;
	int id;

	@RequestMapping(value = "home", method = RequestMethod.GET)
	///@RequestMapping(value = "test", method = RequestMethod.GET)
	public String indexDefault(Model model){
		
		List<Grid> gridList = testDAO.getGridRecords();
		model.addAllAttributes(gridList);
		//List<Person> personList = testDAO.getAllPersons();
		//model.addAllAttributes(personList);
		///model.addAttribute(personList.get(0));
		//System.out.println(model.);
		///return "test";
		return "home";
	}
	
	@ResponseBody
    @RequestMapping("/senddatafromserver")
	public List<Grid> getall(Model model){
		return testDAO.getGridRecords();
	}
	
	@ResponseBody		
	@RequestMapping(value = "/valuefromclientthroughajax", method = RequestMethod.POST)
	public String saveHosting(@RequestBody String idd) {	      
		System.out.println("value from client through ajax: " + idd);
		id = Integer.parseInt(idd);
		Grid queryGrid = testDAO.getGridRecord(idd);
		
		String outstr = queryGrid.getCategory() + ", " + String.valueOf(queryGrid.getGridId()) + ", " + 
						String.valueOf(queryGrid.getLat1()) + ", " + String.valueOf(queryGrid.getLon1()) + ", " + 
						String.valueOf(queryGrid.getLat2()) + ", " + String.valueOf(queryGrid.getLon2());
		
		System.out.println(outstr);
		
		return null;	    
	}
}
