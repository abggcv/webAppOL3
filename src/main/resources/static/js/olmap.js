/* Javascript file for displaying map
 * defines map sources for different layers
 * drop-down selection for selecting a map layer
 * controls for zoom in/out, zoom to full extent and panning control
 * 
 */

//bing basic map
var layer1 = new ol.layer.Tile({
	visible: false, //not to be shown by default
	preload: Infinity,
	source: new ol.source.BingMaps({
		key: 'AnAOw8RzJx9QB9aXy0J3QgHsCHGFCQsp_PlwAb7Dc5X1J81kEJ4rxhtBUr3I_6Ex',  //BING key
		imagerySet: "Road"
			// use maxZoom 19 to see stretched tiles instead of the BingMaps
			// "no photos at this zoom level" tiles
			// maxZoom: 19
	})
});

//satellite image from BING Maps
var layer2 = new ol.layer.Tile({
	visible: false, //not to be shown by default
	preload: Infinity,
	source: new ol.source.BingMaps({
		key: 'AnAOw8RzJx9QB9aXy0J3QgHsCHGFCQsp_PlwAb7Dc5X1J81kEJ4rxhtBUr3I_6Ex',  //BING key
		imagerySet: "Aerial"
			// use maxZoom 19 to see stretched tiles instead of the BingMaps
			// "no photos at this zoom level" tiles
			// maxZoom: 19
	})

});

//Satellite image from BING Maps with Labels
var layer3 = new ol.layer.Tile({
	visible: false, //not to be shown by default
	preload: Infinity,
	source: new ol.source.BingMaps({
		key: 'AnAOw8RzJx9QB9aXy0J3QgHsCHGFCQsp_PlwAb7Dc5X1J81kEJ4rxhtBUr3I_6Ex', //BING Key
		imagerySet: 'AerialWithLabels'
			// use maxZoom 19 to see stretched tiles instead of the BingMaps
			// "no photos at this zoom level" tiles
			// maxZoom: 19
	})
});

//vector layer for project boundary in kml file format
var projectBoundary = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/qatar_boundary.kml',
        format: new ol.format.KML()
      }),
	style: new ol.style.Style({
		stroke: new ol.style.Stroke({width: 5})  //not having any effect on width
	})
});


//list of layers of maps
var layersArray = [];
layersArray.push(layer1);
layersArray.push(layer2);
layersArray.push(layer3);
layersArray.push(projectBoundary);

//extent parameters for zoom to full extent function
//top left corner of screen is mapped to these coordinates when zoom to full extent is clicked
var extTL = ol.proj.transform([49, 25.7], 'EPSG:4326', 'EPSG:3857');   

//bottom right corner of screen is mapped to these coordinates when zoom to full extent is clicked
var extBR = ol.proj.transform([55, 24.5], 'EPSG:4326', 'EPSG:3857');

//control for zoom to full extent
var zoomToExtentControl = new ol.control.ZoomToExtent({        
	extent: [extTL[0], extTL[1], extBR[0], extBR[1]]
});


/**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
}));

/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

//extent to define map-area within which user can pan, zoom in/out
var maxExtent = [50,24.5,52,25.7];

//define map
var map = new ol.Map({      
	layers: layersArray,  //map layer to be loaded as one of the layers in the list of layers defined earlier
	loadTilesWhileInteracting: true, //keep loading tiles while user browse through the map
	overlays: [overlay],
	renderer: 'canvas',
	target: 'map', 	
	view: new ol.View({  //define the initial view properties of map like what coordinate its centred at when its opened 
		//for the first time and what zoom level the map will show at
		center: new ol.proj.transform([52,25.1], 'EPSG:4326', 'EPSG:3857'),   // --> decreasing 24~25s is upwards
		extent: ol.proj.transformExtent(maxExtent, 'EPSG:4326', 'EPSG:3857'), // --> increasing 50~52 is lefwards
		zoom: 8,  //9
		minZoom:7,//min. zoom allowed  5
		maxZoom:19//max. zoom allowed  19
	})          
});


//define features to draw - define stroke width, color, size of circle for point
var features = new ol.Collection();

//features to be overlayed
var featureOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({features: features}),
  style: new ol.style.Style({
    fill: new ol.style.Fill({  //for filling up the polygon
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({  //for drawing the polyline or edges of polygon
      color: '#00ff00',
      width: 2
    }),
    image: new ol.style.Circle({  //for drawing the circle
      radius: 7,
      fill: new ol.style.Fill({
        color: '#0000ff'
      })
    })
  })
});

featureOverlay.setMap(map);

//variable to allow/dis-allow drawing of features
var drawStatus;

//add zoom to full extent control to the map controls
map.addControl(zoomToExtentControl);

//show mouse cursor coordinates
map.addControl(new ol.control.MousePosition({
                    undefinedHTML: ' ',
                    projection: 'EPSG:4326',                   
                    coordinateFormat: function(coordinate) {
                        return ol.coordinate.format(coordinate, '{x}, {y}', 4);
                    }
                }));


//show map overview
map.addControl(new ol.control.OverviewMap({
	// see in overviewmap-custom.html to see the custom CSS used
	className: 'ol-overviewmap ol-custom-overviewmap',
	collapseLabel: '\u00BB',
	label: '\u00AB',
    collapsed: false
}));


//show scaleline
map.addControl(new ol.control.ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')}));

//global variables to control drawing features over map
var draw; //interaction draw object
//var drawVertices;
var vertices;
var coords = [];
var coord = [];
var rowId;
var lat;
var long;

var drawType = document.getElementById('drawtype'); //reference to feature type selected to draw

//function to draw features on map
function addInteraction() {	
    draw = new ol.interaction.Draw({
      features: features,
      type: /** @type {ol.geom.GeometryType} */ (drawType.value)     
    });        
        
    
    //event launched when user starts drawing a feature
    //clear any overlayed features when user starts drawing a new feature
    draw.on('drawstart', function(e){    	    
    	featureOverlay.getSource().clear();       	
    	coords = [];
    });
   
    draw.on('drawend', function(e){    	
        	    	
    	vertices = e.feature.getGeometry().getCoordinates();
    	
    	if(drawType.value === 'Point'){
    		coords.push(new ol.proj.transform(vertices, 'EPSG:3857', 'EPSG:4326')); //[lat, lon]
    		lat = coords[0][0];  
    		long = coords[0][1];    		
    		generateIdFromCoords();
    		coord = vertices;    		
    	}
    	
    	//draw circle at individual vertices for polyline drawn
    	if(drawType.value === 'LineString'){    	    		        	                	    	    		
        	var i;
        	for(i = 0; i < vertices.length; i++){        		    	
        		features.push(new ol.Feature({'geometry': new ol.geom.Point(vertices[i])}));
        		coords.push(new ol.proj.transform(vertices[i], 'EPSG:3857', 'EPSG:4326'))
        	}             
        	
        	lat = coords[0][0];
        	long = coords[0][1];
        	generateIdFromCoords();
        	coord = vertices[0];
    	}
    	
    	//draw circle at individual vertices for polygon drawn
    	if(drawType.value === 'Polygon'){    		    		    		
    		
    		var i;
    		var j;
        	for(i = 0; i < vertices[0].length-1; i++){        		
        		features.push(new ol.Feature({'geometry': new ol.geom.Point(vertices[0][i])}));
        		coords.push(new ol.proj.transform(vertices[0][i], 'EPSG:3857', 'EPSG:4326'));
        	}    		    	        	
        	coord = vertices[0][0];
        	lat = coords[0][0];
        	long = coords[0][1];
        	generateIdFromCoords();
    	}    	
    	
    	content.innerHTML = '<p>' + drawType.value + ' drawn at: </p><code>' + lat.toFixed(2) + ', ' 
    						+ long.toFixed(2) + '</code>';
    	overlay.setPosition(coord);        	
    });
    
    //add interaction to draw over map
    map.addInteraction(draw);    
    
}


//keep first layer as visible when map first shows
layersArray[0].setVisible(true);


/**
 * Let user change the map type
 * by changing map type option in menu
 * only selected map type layer is visible
 * and visible for all others is turned off
 */
function onChange() {
	var layerType = document.getElementById("layer-type").value;

	if(layerType === 'Basic'){
		layersArray[0].setVisible(true);
		layersArray[1].setVisible(false);
		layersArray[2].setVisible(false);
	}

	if(layerType === 'Satellite'){
		layersArray[0].setVisible(false);
		layersArray[1].setVisible(true);
		layersArray[2].setVisible(false);
	}

	if(layerType === 'Satellite with labels'){
		layersArray[0].setVisible(false);
		layersArray[1].setVisible(false);
		layersArray[2].setVisible(true);
	}

};

//function called when user changes features to be drawn
drawType.onchange = function() {
	//remove earlier interaction if any
	map.removeInteraction(draw);
		
	//call function to change interaction type and add new interaction
	addInteraction();	
};

//call function to change interaction type and add new interaction
addInteraction();

//to read and show IDF information from coordinates
var delta_latitude = 0.16;  //size of grid cell along horizontal in degrees
var delta_longitude = 0.10; //size of grid cell along vertical in degrees

var latitudeBL = 49.7; //latitude of bottom left corner of grid
var longitudeBL = 24.18; //longitude of bottom left corner of grid


//logic to map coordinate to corresponding row of the grid table
function generateIdFromCoords(){	
	
	var colNum = Math.floor((lat-latitudeBL)/delta_latitude);  //compute col number
	var rowNum = Math.floor((long-longitudeBL)/delta_longitude); //compute row number
	
	rowInd = rowNum + 20*(colNum-1);
	
	//alert("Row id for lat-long: (" + lat + ", " + long + ") is: " + rowInd);
}

//run query on clicking Show IDF button
jQuery(document).ready(
		function($) {
		  $("#show-idf").click(function(event) {			
			$.ajax({
	            type: "POST",
	            contentType: "application/json",
	            url: "sendrowidtoserver",
	            data: JSON.stringify(rowInd),
	            dataType: 'json',
	            timeout: 600000,
	            success: function (data) {
	            	if(data.category === 1){  //category = 1 is for inside Qatar
	            	
	            		content.innerHTML = '<p>IDF model parameter values from server: </p><code>' 
	            			+ "Row id: "+ data.id + ", Param1:" + data.param1 + ", Param2:"  + data.param2 + 
	            			", Param3:"  + data.param3 +'</code>';
	            		
	                	overlay.setPosition(coord);	            			            		
	            	}
	            	else
	            		alert("Point ( " + lat.toFixed(2) + ", " + long.toFixed(2) + ") selected outside Qatar");
	            },
	            error: function (e) {
	            	alert("Error communicating with the server!!");	            
	            }					
			});					
		  });	  		
		});


/*lat = 51.15;
long = 25.90;
generateIdFromCoords();
*/


/*alert("IDF model parameter values from server row id: " + 
data.id + ", Param1:" + data.param1 + ", Param2:"  + data.param2 + 
", Param3:"  + data.param3);*/




