package com.example.domain;

public class Grid {

	private String category;
	private double lat1;
	private double lon1;
	private double lat2;
	private double lon2;
	private int gridId;
	
	public void setId(int id) {
		this.gridId = id;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public void setLon1(double lon) {
		this.lon1 = lon;
	}
	
	public void setLat1(double lat) {
		this.lat1 = lat;
	}
	
	public void setLon2(double lon) {
		this.lon2 = lon;
	}
	
	public void setLat2(double lat) {
		this.lat2 = lat;
	}
	
	public int getGridId() {
		return gridId;
	}
	
	public String getCategory() {
		return category;
	}
	
	public double getLon1() {
		return lon1;
	}
	
	public double getLat1() {
		return lat1;
	}
	
	public double getLon2() {
		return lon2;
	}
	
	public double getLat2() {
		return lat2;
	}
	
	@Override
	public String toString() {
		
		return "id=" + gridId + ", Type=" + category + ", Lat1=" + lat1 + ", Lon1=" + lon1 + ", Lat2=" + lat2 + ", Lon2=" + lon2;
		
	}
	
	//@Override
	public int getGridIdForCoordinate(double latP, double lonP){
		
		int id = -1;				
		
		int lat = (int)Math.floor(latP);
		
		
		
		return id;
	}
	
}
