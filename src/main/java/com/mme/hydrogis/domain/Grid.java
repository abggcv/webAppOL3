package com.mme.hydrogis.domain;

import java.io.Serializable;

public class Grid implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int id;
	private double longitude;
	private double latitude;
	private double longBL;
	private double latiBL;
	private double longTR;
	private double latiTR;
	private int category;
	private double param1;
	private double param2;
	private double param3;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongBL() {
		return longBL;
	}
	public void setLongBL(double longTL) {
		this.longBL = longTL;
	}
	
	public double getLatiBL() {
		return latiBL;
	}
	public void setLatiBL(double latiBL) {
		this.latiBL = latiBL;
	}
	
	public double getLatiTR() {
		return latiTR;
	}
	public void setLatiTR(double latiTR) {
		this.latiTR = latiTR;
	}
	public double getLongTR() {
		return longTR;
	}
	public void setLongTR(double longTR) {
		this.longTR = longTR;
	}
	
	
	public int getCategory() {
		return category;
	}
	
	public void setCategory(int category) {
		this.category = category;
	}
	
	public double getParam1() {
		return param1;
	}
	
	public void setParam1(double param) {
		this.param1 = param;
	}
	
	public double getParam2() {
		return param2;
	}
	
	public void setParam2(double param) {
		this.param2 = param;
	}
	
	public double getParam3() {
		return param3;
	}
	
	public void setParam3(double param) {
		this.param3 = param;
	}
	
	@Override
	public String toString() {
		return "Grid [id=" + id + ", longitude=" + longitude + ", latitude=" + latitude + ", longTL=" + longBL
				+ ", latiTL=" + latiBL + ", longBR=" + longTR + ", latiBR=" + latiTR + ", category=" + category 
				+ ", param1=" + param1 + ", param2=" + param2 + ", param3=" + param3 + "]";
	}
	
}
