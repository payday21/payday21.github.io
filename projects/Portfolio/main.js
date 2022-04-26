


(function(){
    var greenIcon = L.icon({
    iconUrl: 'plane4-45.png',
   

    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
   popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
    var geojsonLayer;
    //create map in leaflet and tie it to the div called 'theMap'
    var map = L.map('theMap').setView([42, -60], 4);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    
//created this function that will encolse the the data and set a time that will 
//refesh all the data in that function
    function refreshMap() { 
        console.log("Fetching data...");
        // fetching the opensky data for all states
         fetch("https://opensky-network.org/api/states/all.")   
        .then(function(response){
            return response.json();
        })
        .then(function(json)
        {
        // created a if condition that will remove the data so the function can refresh the 
        // data every time the function is called   
            if(geojsonLayer) {
                map.removeLayer(geojsonLayer);
            }

            //filter the data here to collect only the data that have the country canada included
            let filtermyOriginCanada = json.states.filter(function(currentValue)
            {
                if(currentValue[2].includes("Canada"))
                {
                return currentValue
                } 
                   
            })
             console.log(filtermyOriginCanada)
            //  created a new variable and map the filter json array to convert them to geojson 
            let geoJsonArray = filtermyOriginCanada.map(function(flight)

            {
                
            // return the json data into geojson format
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [flight[5], flight[6]],
                        time_position:[flight[3]],
                        last_contact:[flight[4]],
                        baro_altitude:[flight[7]],
                        on_ground:[flight[8]],
                        velocity:[flight[9]],
                        true_track:[flight[10]],
                        vertical_rate:[flight[11]],
                        geo_altitude:[flight[13]],
                        postion_source:[flight[16]]


                    },
                    properties: {
                        icon: greenIcon,
                        address: [flight[0]],
                        callsign: [flight[1]],
                        origin_country:[flight[2]],
                        sensors:[flight[12]],
                        squawk:[flight[14]],
                        spi:[flight[16]],
                        popup_content:flight[2]?flight[2].toString():"0"

                    }
                }
                
              

            });

            
            
// created this function The onEachFeature option is a 
// function that gets called on each feature before adding it to a GeoJSON layer this populates the 
// popup content when the icon is click. 

            function onEachFeature(feature, layer) 
            {
                
    // the condition is to see if  this feature have a property named popupContent?
                if (feature.properties && feature.properties.popup_content) 
                {
                    layer.bindPopup("This is Air " +`${feature.properties.origin_country}<br/> Address ${feature.properties.address}<br/> First Seen at ${feature.geometry.time_position}<br/> 
                    estimated Departure Airport:${feature.properties.address}  <br/> last seen:${feature.geometry.last_contact}
                    <br/> with an altitude of: ${feature.geometry.geo_altitude}`);
                }               
    
            }
           
    //  This block of code will return (north=0°) rotationangle of all iconand add them to the map.  
            geojsonLayer = L.geoJSON(geoJsonArray, 
            {
            onEachFeature: onEachFeature,
            pointToLayer: function (feature, latlng) 
            {
                return L.marker(latlng, {icon: greenIcon, rotationAngle: feature.geometry.true_track})
            }
            }).addTo(map);

    // setting a refresh timer to refresh data on the map
            setTimeout(refreshMap, 7000);
                                

        })


    }
             
       
        
        
        
            
        
    
    // function call
    refreshMap();


})()