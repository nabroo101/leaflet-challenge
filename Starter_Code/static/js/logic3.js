// Testting server
console.log("Hello World");

// Create the base layers.
let street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

let topo = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
     'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo,
};
let earthquakes = new L.layerGroup();

// creating overlay object
let overlayMaps = {
  Earthquakes: earthquakes,
};

let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5.0,
  layers: [street, earthquakes],
});

// creating toggel switch to change from different map views
L.control
  .layers(baseMaps, overlayMaps, {
    collapsed: false,
  })
  .addTo(myMap);

// assiging the USGS earth quake data URL to a variable called url
let url =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";
//using d3.json to open the geojson file
d3.json(url).then(function (data) {
  console.log(data.features[0]);

  // logic3 : markerSize function
  function markerSize(magnitude) {
    return magnitude * 4;
  }
  function markerColor(depth) {
    return (
      depth > 1000 ? '#d73027' :
        depth > 500 ? '#f46d43' :
          depth > 200 ? '#fdae61' :
            depth > 100 ? '#fee08b' :
              depth > 50 ? '#d9ef8b' :
                depth > 20 ? '#a6d96a' :
                  depth > 10 ? '#66bd63' :
                    '#1a9850'
    );
  }

  function styleInfo(feature) {
    return {
      radius: markerSize(feature.properties.mag),//calling the marker size function
      fillColor: markerColor(feature.geometry.coordinates[2]),
      color: "green",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.5,
    };
  }

  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, styleInfo(feature));
    },
    //using popup in the map with magnitude, depth, time and location
    onEachFeature: function onEachFeature(feature, layer) {
      layer.bindPopup(`
        <h3>Location: ${feature.properties.place}</h3>
        <hr>
        <h3>Time: ${new Date(feature.properties.time)}</h3>
        <h3>Magnitude: ${feature.properties.mag}</h3>
        <h3>Depth: ${feature.geometry.coordinates[2]}</h3>
        `);
    }
  }).addTo(earthquakes);
});
