package com.example.domain;

public class Grid {

	private String category;
	private double lat;
	private double lon;
	private int gridId;
	
	public void setId(int id) {
		this.gridId = id;
	}
	
	public void setCategory(String category) {
		this.category = category;
	}
	
	public void setLon(double lon) {
		this.lon = lon;
	}
	
	public void setLat(double lat) {
		this.lat = lat;
	}
	
	public int getGridId() {
		return gridId;
	}
	
	public String getCategory() {
		return category;
	}
	
	public double getLon() {
		return lon;
	}
	
	public double getLat() {
		return lat;
	}
	
	@Override
	public String toString() {
		
		return "id=" + gridId + ", Type=" + category + ", Lat=" + lat + ", Lon=" + lon;
		
	}
	
}
