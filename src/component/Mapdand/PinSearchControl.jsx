import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-search/src/leaflet-search.css';
import 'leaflet-search/src/leaflet-search.js';

const PinSearchControl = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const searchLayer = L.layerGroup();
    markers.forEach(marker => {
      const { markerPosition, title, desc } = marker;
      const leafletMarker = L.marker(markerPosition, {
        title,
        desc,
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/2238/2238263.png', // Adjust this path
          iconSize: [0, 0], // Adjust size as necessary
          iconAnchor: [12, 41], // Adjust anchor as necessary
          popupAnchor: [1, -34], // Adjust popup anchor as necessary
        }),
      });
      searchLayer.addLayer(leafletMarker);
    });

    map.addLayer(searchLayer);

    const searchControl = new L.Control.Search({
      position: 'topleft', // Middle top position
      layer: searchLayer,
      initial: false,
      collapsed: true,
      textPlaceholder: 'Search...',
      moveToLocation: function(latlng, title, map) {
        map.setView(latlng, 15); // Adjust zoom level as needed
      }
    }).addTo(map);

    return () => {
      if (map.hasLayer(searchLayer)) {
        map.removeControl(searchControl);
        searchLayer.clearLayers();
        map.removeLayer(searchLayer);
      }
    };
  }, [map, markers]);

  return null;
};

export default PinSearchControl;