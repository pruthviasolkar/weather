 
     
//MAP
var mymap = L.map('map', {
    center: [19.0760,  72.8777],
    zoom: 6,
    // zoomControl: false,
});

//BASEMAPS
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
{
    // attribution: '&copy; <a href="http://osm.org/copyright" target = "_blank">OpenStreetMap</a> contributors'
}).addTo(mymap);



var popup = L.popup();
//marker
L.marker([22.5726, 88.3639]).addTo(mymap)
     
    
     L.marker([12.12,76.68]).addTo(mymap)
      
         
     L.marker([24.8726, 74.629]).addTo(mymap)
      
     L.marker([21.25726, 81.6239]).addTo(mymap)
      
     
     L.marker([26.85726, 80.9439]).addTo(mymap)
      
      
     L.marker([28.67, 77.0639]).addTo(mymap)
       
     
     L.marker([ 22.7226,71.6339]).addTo(mymap)
      
      
     L.marker([19.35726, 84.98639]).addTo(mymap)
       
     
     L.marker([25.4726, 85.7039]).addTo(mymap)
      
     
     L.marker([8.8926, 76.6139]).addTo(mymap)
     
     
     L.marker([11.7866, 77.8039]).addTo(mymap)
      
     
     L.marker([25.9826, 79.4539]).addTo(mymap)
     
     
     L.marker([30.5226, 75.8939]).addTo(mymap)
      
 
     L.marker([22.4260, 85.7677]).addTo(mymap)
      
 
 L.marker([11.6226, 92.7239]).addTo(mymap)
     
     
     L.marker([18.1026, 78.8539]).addTo(mymap)
      
         
     L.marker([19.1800,	72.9633])
     .addTo(mymap)
      
     L.marker([23.3556,	85.3347
     ]).addTo(mymap)
      
     
     L.marker([25.1800	,75.8300
     ]).addTo(mymap)
     
      
     L.marker([17.6833,	75.9167
     ]).addTo(mymap)
      
     L.marker([19.3000	,72.8500
     ]).addTo(mymap)
      
     L.marker([9.9667,	76.2833
     ]).addTo(mymap)
     
     
     L.marker([32.7333	,74.8500
     ]).addTo(mymap)
     
     
     L.marker([21.0167,	75.5667
     ]).addTo(mymap)
      
     
     L.marker([20.7333	,77.0000
     ]).addTo(mymap)
     
     L.marker([15.1500,	76.9150
     ]).addTo(mymap)
      
     
     L.marker([27.4833,	77.6833
     ]).addTo(mymap)
      
 
     L.marker([19.3200,	84.8000
     ]).addTo(mymap)
      
 
     L.marker([26.7200,	88.4200
     ]).addTo(mymap)

//popup function
function onMapClick(e) {

    popup
    
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString()) //esample from leaflet, will be immediately replaced by weatherpopup...
        .openOn(mymap);
        // marker.bindPopup(popup).openPopup();

//getting json function
$(document).ready(function(){
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/weather?lat=" + e.latlng.lat + '&lon=' + e.latlng.lng + "&appid=1ba2c13849378572414228262f65dcd5",
    dataType: 'json',
    success: function(data) {
      // storing json data in variables
      weatherlocation_lon = data.coord.lon; // lon WGS84
      weatherlocation_lat = data.coord.lat; // lat WGS84
      weatherstationname = data.name // Name of Weatherstation
      weatherstationid = data.id // ID of Weatherstation
      weathertime = data.dt // Time of weatherdata (UTC)
      temperature = data.main.temp; // Kelvin
      airpressure = data.main.pressure; // hPa
      airhumidity = data.main.humidity; // %
      temperature_min = data.main.temp_min; // Kelvin
      temperature_max = data.main.temp_max; // Kelvin
      windspeed = data.wind.speed; // Meter per second
      winddirection = data.wind.deg; // Wind from direction x degree from north
      cloudcoverage = data.clouds.all; // Cloudcoverage in %
      weatherconditionid = data.weather[0].id // ID
      weatherconditionstring = data.weather[0].main // Weatheartype
      weatherconditiondescription = data.weather[0].description // Weatherdescription
      weatherconditionicon = data.weather[0].icon // ID of weathericon

    // Converting Unix UTC Time
    var utctimecalc = new Date(weathertime * 1000);
    var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var year = utctimecalc.getFullYear();
    var month = months[utctimecalc.getMonth()];
    var date = utctimecalc.getDate();
    var hour = utctimecalc.getHours();
    var min = utctimecalc.getMinutes();
    var sec = utctimecalc.getSeconds();
    var time = date + '.' + month + '.' + year + ' ' + hour + ':' + min + ' Uhr';

    // recalculating
    var weathercondtioniconhtml = "http://openweathermap.org/img/w/" + weatherconditionicon + ".png";
    var weathertimenormal = time; // reallocate time var....
    var temperaturecelsius = Math.round((temperature - 273) * 100) / 100;  // Converting Kelvin to Celsius
    var windspeedknots = Math.round((windspeed * 1.94) * 100) / 100; // Windspeed from m/s in Knots; Round to 2 decimals
    var windspeedkmh = Math.round((windspeed * 3.6) * 100) / 100; // Windspeed from m/s in km/h; Round to 2 decimals
    var winddirectionstring = "Im the wind from direction"; // Wind from direction x as text
    if (winddirection > 348.75 &&  winddirection <= 11.25) {
        winddirectionstring =  "North";
    } else if (winddirection > 11.25 &&  winddirection <= 33.75) {
        winddirectionstring =  "Northnortheast";
    } else if (winddirection > 33.75 &&  winddirection <= 56.25) {
        winddirectionstring =  "Northeast";
    } else if (winddirection > 56.25 &&  winddirection <= 78.75) {
        winddirectionstring =  "Eastnortheast";
    } else if (winddirection > 78.75 &&  winddirection <= 101.25) {
        winddirectionstring =  "East";
    } else if (winddirection > 101.25 &&  winddirection <= 123.75) {
        winddirectionstring =  "Eastsoutheast";
    } else if (winddirection > 123.75 &&  winddirection <= 146.25) {
        winddirectionstring =  "Southeast";
    } else if (winddirection > 146.25 &&  winddirection <= 168.75) {
        winddirectionstring =  "Southsoutheast";
    } else if (winddirection > 168.75 &&  winddirection <= 191.25) {
        winddirectionstring =  "South";
    } else if (winddirection > 191.25 &&  winddirection <= 213.75) {
        winddirectionstring =  "Southsouthwest";
    } else if (winddirection > 213.75 &&  winddirection <= 236.25) {
        winddirectionstring =  "Southwest";
    } else if (winddirection > 236.25 &&  winddirection <= 258.75) {
        winddirectionstring =  "Westsouthwest";
    } else if (winddirection > 258.75 &&  winddirection <= 281.25) {
        winddirectionstring =  "West";
    } else if (winddirection > 281.25 &&  winddirection <= 303.75) {
        winddirectionstring =  "Westnorthwest";
    } else if (winddirection > 303.75 &&  winddirection <= 326.25) {
        winddirectionstring =  "Northwest";
    } else if (winddirection > 326.25 &&  winddirection <= 348.75) {
        winddirectionstring =  "Northnorthwest";
    } else {
        winddirectionstring =  " - currently no winddata available - ";
    };

//Popup with content
    var fontsizesmall = 1;
    popup.setContent("Weatherdata:<br>" + "<img src=" + weathercondtioniconhtml + "><br>" + weatherconditionstring + " (Weather-ID: " + weatherconditionid + "): " + weatherconditiondescription + "<br><br>Temperature: " + temperaturecelsius + "°C<br>Airpressure: " + airpressure + " hPa<br>Humidityt: " + airhumidity + "%" + "<br>Cloudcoverage: " + cloudcoverage + "%<br><br>Windspeed: " + windspeedkmh + " km/h<br>Wind from direction: " + winddirectionstring + " (" + winddirection + "°)" + "<br><br><font size=" + fontsizesmall + ">Datasource:<br>openweathermap.org<br>Measure time: " + weathertimenormal + "<br>Weatherstation: " + weatherstationname + "<br>Weatherstation-ID: " + weatherstationid + "<br>Weatherstation Coordinates: " + weatherlocation_lon + ", " + weatherlocation_lat);           


    },
    error: function() {
      alert("error receiving wind data from openweathermap");
    }
  });        
});
//getting json function ends here

//popupfunction ends here
}

//popup
mymap.on('click', onMapClick);
 