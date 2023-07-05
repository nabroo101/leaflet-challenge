# leaflet-challenge

# USGS Earthquake Visualization Tool (Leaflet.js Challenge)

## Background

The United States Geological Survey (USGS) is a scientific agency that provides data about natural hazards, ecosystems, environmental health, and the impacts of climate and land-use changes. Their scientists develop new methods and tools to supply timely and useful information about the Earth and its processes.

This project presents a new set of tools that allow USGS to visualize their earthquake data. USGS collects a vast amount of data worldwide daily, and they needed a meaningful way of displaying it. This challenge was to develop a method to visualize USGS data that will allow them to better educate the public and other government organizations on issues facing our planet.


### Part 1: Earthquake Visualization

1. **Dataset:** The USGS provides earthquake data in various formats, updated every 5 minutes. We chose a dataset to visualize from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page.

2. **Visualization:**
   - A map was created using Leaflet.js, plotting all the earthquakes from the dataset based on their longitude and latitude.
   - Data markers reflect the magnitude of the earthquake in their size and the depth of the earthquake by color. Earthquakes with higher magnitudes appear larger, and earthquakes with greater depth appear darker in color.
   - Popups provide additional information about the earthquake when its associated marker is clicked.
   - A legend provides context for the map data.

### Part 2: Tectonic Plates Data (Optional)

In this part, a second dataset is plotted on the map to illustrate the relationship between tectonic plates and seismic activity. This dataset can be found [here](https://github.com/fraxen/tectonicplates).

Additional improvements include:
- More base maps to choose from
- Separate overlays for each dataset, which can be turned on and off independently
- Layer controls added to the map

## Running the Code

To run the application:

1. Clone the repository to your local machine.
2. Navigate to the Leaflet-Part-1 directory for the first part of the challenge, or Leaflet-Part-2 for the second part.
3. Open the index.html file in your web browser.

Please note that this project requires an internet connection to pull in the USGS and tectonic plate datasets and the Leaflet.js library.

## Built With

- JavaScript
- Leaflet.js
- D3.js
- HTML/CSS

## Author

Mohamed Abouelkhier

Github: [@nabroo101](https://github.com/nabroo101/leaflet-challenge)

## Acknowledgments

- [USGS](https://www.usgs.gov/) for providing the earthquake dataset
- [Tectonic Plates Data](https://github.com/fraxen/tectonicplates) for providing the tectonic plates GeoJSON data
- Leaflet Documentation for [Layers Control](https://leafletjs.com/examples/layers-control/), [GeoJSON](https://leafletjs.com/examples/geojson/), and [Choropleth](https://leafletjs.com/examples/choropleth/) for providing examples and resources on how to work with layers, GeoJSON data, and creating legends.

## Code References

The code in this repository is based on the [Leaflet.js documentation](https://leafletjs.com/). Key references within the code include:

1. Usage of `L.tileLayer` to create different base layers for the map.
2. Creation of a layer group for earthquakes using `L.layerGroup()`.
3. Use of `L.control.layers` to create a toggle switch to change from different map views.
4. Use of `d3.json` to fetch and open the GeoJSON file.
5. Use of the `L.geoJSON` function to convert GeoJSON data into features on the map.
6. Creation of a popup for each feature with additional information about the earthquake.
7. Creation of a custom legend using `L.control` and adding it to the map.

For more detailed understanding, please refer to the code comments and the Leaflet.js documentation.