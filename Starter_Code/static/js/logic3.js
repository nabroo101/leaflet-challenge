// Testting server
console.log("Hello World");

//adding my attribution to both views street and topo
// Create the base layers.
let street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
    "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101/leaflet-challenge> Github<a/>",
});

let Staellite = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
  attribution:
    'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' +
    "<br> Analyst: Mo Abou <a href=https://github.com/nabroo101/leaflet-challenge> Github<a/>",
});

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Staellite": Staellite,
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
    return depth > 90
      ? "#d73027"
      : depth > 90
      ? "#f46d43"
      : depth > 70
      ? "#fdae61"
      : depth > 50
      ? "#fee391"
      : depth > 30
      ? "#d9ef8b"
      : depth > 10
      ? "#a6d96a"
      : depth > -10
      ? "#006d2c"
      : "#1a9850";
  }

  function styleInfo(feature) {
    return {
      radius: markerSize(feature.properties.mag), //calling the marker size function
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
    },
  }).addTo(earthquakes);
  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function (myMap) {
    let div = L.DomUtil.create("div", "info legend"),
      grades = [-10, 10, 30, 50, 70, 90];
      labels = ["soft", "normal", "dc","dc","dcdc","dccdc" ];

    // loop through our density intervals and generate a label with a colored square for each interval
    //refrence : https://leafletjs.com/examples/choropleth/
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' +
        markerColor(grades[i] + 1) +
        '"></i> ' +
        grades[i] +
        (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }

    return div;
  };

  legend.addTo(myMap);
});
