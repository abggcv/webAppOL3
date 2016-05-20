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
	//overlays: [overlay],
	target: 'map', 	
	view: new ol.View({  //define the initial view properties of map like what coordinate its centered at when its opened 
		//for the first time and what zoom level the map will show at
		center: new ol.proj.transform([51,25.1], 'EPSG:4326', 'EPSG:3857'),
		zoom: 9,
		minZoom:5,//min. zoom allowed
		maxZoom:19//max. zoom allowed
	})          
});


//define features to draw - define stroke width, color, size of circle for point
var features = new ol.Collection();

//features to be overlayed
var featureOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({features: features}),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#00ff00',
      width: 2
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#0000ff'
      })
    })
  })
});
featureOverlay.setMap(map);

//variable to allow/dis-allow drawing of features
var drawFeatures = 1;

//add zoom to full extent control to the map controls
map.addControl(zoomToExtentControl);

//add button for full screen map
map.addControl(new ol.control.FullScreen());

//global variables to control drawing features over map
var draw; //interaction draw object
var drawType = document.getElementById('drawtype'); //reference to feature type selected to draw

//function to draw features on map
function addInteraction() {
	
    draw = new ol.interaction.Draw({
      features: features,
      type: /** @type {ol.geom.GeometryType} */ (drawType.value)     
    });    
    
    //disallow drawing features once user has finished drawing 
    //--> logic is not working --> need to look into this
    if (drawFeatures === 1){
    	drawFeatures = 0;
    	map.addInteraction(draw);
    }
    
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
	if (drawFeatures === 0)
		drawFeatures = 1;
	
	featureOverlay.getSource().clear();
	map.removeInteraction(draw);
	addInteraction();	
};

addInteraction();








/*function addInteractionByButtonClick(){

draw = new ol.interaction.Draw({
     //source: source,
     features: features,
     type: *//** @type {ol.geom.GeometryType} *//* (selectedType)
     //maxPoints: 1
   });
   map.addInteraction(draw);

}

function clickedPoint(){
selectedType = "Point";
document.getElementById("point").innerHTML = "point clicked";
map.removeInteraction(draw);
addInteractionByButtonClick();
}

function clickedPolyline(){
selectedType = "LineString";
document.getElementById("point").innerHTML = "polyline clicked";
map.removeInteraction(draw);
addInteractionByButtonClick();
}

function clickedPolygon(){
selectedType = "Polygon";
document.getElementById("point").innerHTML = "polygon clicked";
map.removeInteraction(draw);
addInteractionByButtonClick();
}

var pointButton = document.getElementById('draw-point');
var polylineButton = document.getElementById('draw-polyline');
var polygonButton = document.getElementById('draw-polygon');

pointButton.addEventListener('onclick', clickedPoint(), false);
polylineButton.addEventListener('onclick', clickedPolyline(), false);
polygonButton.addEventListener('onclick', clickedPolygon(), false);*/

//addInteraction();


//addInteractionByButtonClick();

//read grid
//var gridRecords = '${gridList}';

//show coordinates on click
/*map.on('click', function(evt) {
	var coordinates = new ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');  //transform to WGS84 coordinates
	
	alert("Clicked on \nLat:" + coordinates[0].toFixed(2) + "\nLong:" + coordinates[1].toFixed(2)); // + 
		  //"\ngridId: " + gridRecords); //display coordinates in alert box
});*/



/*drawtype.onchange = function() {	
	map.removeInteraction(draw);
	drawType = document.getElementById("draw-type").value;	
	var maxPoints;
	if (drawType === "Point"){
		maxPoints = 1;
		document.getElementById("point").innerHTML = "point clicked";
	}
	else
		maxPoints = 5;
	
	draw = new ol.interaction.Draw({
	      //source: source,
	      features: features,
	      type: *//** @type {ol.geom.GeometryType} *//* (drawType),
	      maxPoints: maxPoints
	    });
   map.addInteraction(draw);*/
	
    //addInteraction();	
//};	
	
//addInteraction();


