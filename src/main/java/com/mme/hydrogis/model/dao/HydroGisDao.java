package com.mme.hydrogis.model.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import com.mme.hydrogis.domain.Grid;

@Component
public class HydroGisDao {

	@Autowired
	JdbcTemplate jdbcTemplate;

	public List<Grid> getAllGridData() {
		System.out.println("inside allgrid method");
		List<Grid> gridData = jdbcTemplate.query("select * from gridtablesample", new RowMapper<Grid>() {

			@Override
			public Grid mapRow(ResultSet rs, int arg1) throws SQLException {
				Grid gridObj = new Grid();
				gridObj.setId(rs.getInt("id"));
				gridObj.setLatitude(rs.getDouble("Latitude"));
				gridObj.setLongitude(rs.getDouble("Longitude"));
				gridObj.setLatiBL(rs.getDouble("LatitudeBL"));
				gridObj.setLongBL(rs.getDouble("LongitudeBL"));
				gridObj.setLatiTR(rs.getDouble("LatitudeTR"));
				gridObj.setLongTR(rs.getDouble("LongitudeTR"));
				gridObj.setCategory(rs.getInt("Category"));
				gridObj.setParam1(rs.getDouble("Param1"));
				gridObj.setParam2(rs.getDouble("Param2"));
				gridObj.setParam3(rs.getDouble("Param3"));

				return gridObj;
			}
		});
		return gridData;
	}
}
