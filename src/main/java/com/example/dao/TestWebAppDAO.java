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
		
		List<Grid> gridList = jdbcTemplate.query("select * from gridsample", new RowMapper<Grid>(){
			
			@Override
			public Grid mapRow(ResultSet rs, int arg1) throws SQLException{
				
				Grid grid = new Grid();
				grid.setId(rs.getInt("Id"));
				grid.setCategory(rs.getString("Category"));
				grid.setLat(rs.getDouble("Latitude"));
				grid.setLon(rs.getDouble("Longitude"));
				
				return grid;
				
			}
			
			
		});
		
		return gridList;
		
	}
	
	
}
