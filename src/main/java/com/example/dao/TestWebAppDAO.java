package com.example.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.example.domain.Grid;
import com.example.domain.Person;
@Component
public class TestWebAppDAO {


	@Autowired
	JdbcTemplate jdbcTemplate;
	public List<Person> getAllPersons(){
		List<Person> personList= jdbcTemplate.query("select * from employee", new RowMapper<Person>(){

			@Override
			public Person mapRow(ResultSet rs, int arg1) throws SQLException {
				Person person = new Person();
				person.setId(rs.getInt("id"));
				person.setName(rs.getString("name"));
				person.setAge(rs.getInt("age"));
				
				return person;
			}
			
			
		});
		return personList;
	}
	
	
	public List<Grid> getGridRecords(){
		
		List<Grid> gridList = jdbcTemplate.query("select * from gridtable", new RowMapper<Grid>(){
			
			@Override
			public Grid mapRow(ResultSet rs, int arg1) throws SQLException{
				
				Grid grid = new Grid();
				grid.setId(rs.getInt("Id"));
				grid.setCategory(rs.getString("Category"));
				grid.setLat1(rs.getDouble("LatitudeTL"));
				grid.setLon1(rs.getDouble("LongitudeTL"));
				grid.setLat2(rs.getDouble("LatitudeBR"));
				grid.setLon2(rs.getDouble("LongitudeBR"));								
				
				return grid;
				
			}
			
			
		});
		
		return gridList;
		
	}
	
	public Grid getGridRecord(String gridID){
		
			System.out.println("Query for row: " + gridID);
		
			Grid grid = (Grid) jdbcTemplate.query("select * from gridtable where Id=" + gridID, new RowMapper<Grid>(){
			
			@Override
			public Grid mapRow(ResultSet rs, int arg1) throws SQLException{
				
				Grid grid = new Grid();
				grid.setId(rs.getInt("Id"));
				grid.setCategory(rs.getString("Category"));
				grid.setLat1(rs.getDouble("LatitudeTL"));
				grid.setLon1(rs.getDouble("LongitudeTL"));
				grid.setLat2(rs.getDouble("LatitudeBR"));
				grid.setLon2(rs.getDouble("LongitudeBR"));								
				
				return grid;
				
			}
			
			
		});
		
		return grid;
		
	}
	
	
}
