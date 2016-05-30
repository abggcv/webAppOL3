package com.mme.hydrogis;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.mme.hydrogis.domain.Grid;
import com.mme.hydrogis.domain.GridData;
import com.mme.hydrogis.utility.UtilityClass;

@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {

	@Autowired
	UtilityClass utilObj;
	
	List<Grid> readgGridData = null;
	
	/*
	 * This method is called during Spring's startup.
	 * @param event Event raised when an ApplicationContext gets initialised or refreshed.
	 */
	@Override
	public void onApplicationEvent(final ContextRefreshedEvent event) {
		//write to serialised file if dont exist already.
		utilObj.writeToSerFile();
		
		//Read from file if list is not null.
		//List<Grid> list = GridData.getReadGridData();
		if(readgGridData == null){
			utilObj.readFromSerFile();
		}
		
		/*try{
			utilObj.readFromSerFile();
		}
		catch(IOException e){
			//read from database
		}*/
		
		//To see the list uncomment it.It is just to check that list has values or not.printed to console.
		List<Grid> readList = GridData.getReadGridData();
		for(Grid obj: readList ){
            System.out.println(obj);
        }
		return;
	}

}