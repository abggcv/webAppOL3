package com.mme.hydrogis.contoller;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mme.hydrogis.domain.Grid;
import com.mme.hydrogis.domain.GridData;
import com.mme.hydrogis.model.dao.HydroGisDao;

@Controller
@RequestMapping("/")
public class GisController {
	
	@Autowired
	HydroGisDao testDAO;
	
	/*    Hit this URL : http://localhost:8080/hydrogis     to access 'home.html' */		
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String indexDefault(Model model){
		xyz();
		return "home";
	}
	
	@RequestMapping(value = "/fetchrow", method = RequestMethod.POST)
	public List<Grid> xyz(){
		List<Grid> readList = GridData.getReadGridData();
		Grid gridtableRow = readList.get(187);
		
		//Grid fetchedRecord = readList[187];
		for(Grid obj :readList ){
			if(obj.getId() == 187)
			System.out.println(obj);
		}
		return readList;
	}
	
	
	@RequestMapping(value = "/valuefromclientthroughajax", method = RequestMethod.POST)
	@ResponseBody
    public String saveHosting(@RequestBody String idd) throws IOException {       
		System.out.println(idd);				
	return null;
    }
		
	@ResponseBody
	@RequestMapping(value = "/sendrowidtoserver", method = RequestMethod.POST)
	public Grid readRow(@RequestBody String idd){
		
		System.out.println("Fetching Grid information for row: " + idd + " from list");
		
		int rowId = Integer.parseInt(idd);
		
		System.out.println("row id: " + rowId);
		
		List<Grid> readList = GridData.getReadGridData();
		Grid gridtableRow = readList.get(rowId-1);
		
		System.out.println(gridtableRow);
		
		return gridtableRow;
	}
	
}