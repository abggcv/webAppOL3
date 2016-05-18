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
var extTL = ol.proj.transform([50, 25.7], 'EPSG:4326', 'EPSG:3857'); 

//bottom right corner of screen is mapped to these coordinates when zoom to full extent is clicked
var extBR = ol.proj.transform([52, 24.5], 'EPSG:4326', 'EPSG:3857');

//control for zoom to full extent
var zoomToExtentControl = new ol.control.ZoomToExtent({        
	extent: [extTL[0], extTL[1], extBR[0], extBR[1]]
});

//define map
var map = new ol.Map({      
	layers: layersArray,  //map layer to be loaded as one of the layers in the list of layers defined earlier
	loadTilesWhileInteracting: true, //keep loading tiles while user browse through the map
	target: 'map',      
	view: new ol.View({  //define the initial view properties of map like what coordinate its centered at when its opened 
		//for the first time and what zoom level the map will show at
		center: new ol.proj.transform([51,25.1], 'EPSG:4326', 'EPSG:3857'),
		zoom: 9,
		minZoom:5,//min. zoom allowed
		maxZoom:19//max. zoom allowed
	})          
});

//add zoom to full extent control to the map controls
map.addControl(zoomToExtentControl);

//add button for full screen map
map.addControl(new ol.control.FullScreen());

//read grid
//var gridRecords = '${gridList}';

//show coordinates on click
map.on('click', function(evt) {
	var coordinates = new ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');  //transform to WGS84 coordinates
	
	alert("Clicked on \nLat:" + coordinates[0].toFixed(2) + "\nLong:" + coordinates[1].toFixed(2)); // + 
		  //"\ngridId: " + gridRecords); //display coordinates in alert box
	});

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