// testting server
console.log("Hello World");

// Create the base layers.
let street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo,
};
let earthquakes = new L.layerGroup();
let overlayMaps = {
  Earthquakes: earthquakes,
};

let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5.0,
  layers: [street, earthquakes],
});
// creating toggel switch to change from diffrent map views
L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

// assiging the USGS earth quake data URL to a vriable called url
let url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";
//using d3.json to open the geojson file
d3.json(url).then(function (data) {
  console.log(data.features[0]);

  let geojsonMarkerOptions = {
    radius: 8,
    fillColor: "red",
    color: "green",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5,
  };

  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    //using popup in the map with magntitude, depth, time and location
    onEachFeature: function onEachFeature(feature, layer){
      layer.bindPopup(`
      <h3>Location: ${feature.properties.place}</h3>
      <hr>
      <h3>Time: ${new Date(feature.properties.time)}</h3>
      <h3>Magnitude: ${feature.properties.mag}</h3>
      <h3>Depth: </h3>
      `);
    }
  }).addTo(earthquakes);
});
