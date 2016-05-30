package com.mme.hydrogis.utility;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.mme.hydrogis.domain.Grid;
import com.mme.hydrogis.domain.GridData;
import com.mme.hydrogis.model.dao.HydroGisDao;

/*Purpose : provide calculation for IDF curves here*/
@Component
public class UtilityClass {

	@Autowired
	HydroGisDao gisDao;
	
	List<Grid> gridDataList = new ArrayList<Grid>();
	
	String serializedFilePath = "datagrid2.ser";//"src/main/resources/static/data/datagrid2.ser"; //"datagrid.ser";//

	public void writeToSerFile() {
		boolean isExist = new File(serializedFilePath).isFile();
		if(isExist) { 
		    // do nothing: if file exist then read data from it otherwise fetch data from DB first.
		}else{
			gridDataList = gisDao.getAllGridData();
			try
		      {
		         FileOutputStream fileOut =
		         new FileOutputStream(serializedFilePath);
		         ObjectOutputStream out = new ObjectOutputStream(fileOut);
		         out.writeObject(gridDataList);
		         out.close();
		         fileOut.close();
		         System.out.printf("Serialized data is saved in grid.ser");
		      }catch(IOException e){
		    	  System.out.println("GisController.java > writeToSerFile() : Error is writing data to serialized file");
		          e.printStackTrace();
		      }
		}
	}
	
	@SuppressWarnings("unchecked")
	public void readFromSerFile(){
	      try
	      {
	         FileInputStream fileIn = new FileInputStream(serializedFilePath);
	         ObjectInputStream in = new ObjectInputStream(fileIn);
	         
	         //reading grid data into list.
	         new GridData((ArrayList<Grid>) in.readObject());
	         
	         in.close();
	         fileIn.close();
	      }catch(IOException e){
	         e.printStackTrace(); //call writetoserfile here
	      }catch(ClassNotFoundException c){
	         System.out.println("Grid class not found");
	         c.printStackTrace();
	      }
	}
}
