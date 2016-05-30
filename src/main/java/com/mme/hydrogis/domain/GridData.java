package com.mme.hydrogis.domain;

import java.util.Collections;
import java.util.List;


//it should be singelton
public class GridData {
	private static List<Grid> readGridData = null;
	
	//default constructor.
	public GridData() {
	}
	
	//This is initialise the grid list.This list be unmodifiable once it is filled with data.You can read it only.
	public GridData(List<Grid> _readgGridData){	
		GridData.readGridData = _readgGridData;
		GridData.readGridData = Collections.unmodifiableList(GridData.readGridData);
	}

	public static List<Grid> getReadGridData() {
		return readGridData;
	}

	@Override
	public String toString() {
		return "Grid List [readgGridData=" + readGridData + "]";
	}
	
}
