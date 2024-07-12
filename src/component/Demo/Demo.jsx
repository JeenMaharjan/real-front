import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

// Function to dynamically load an external script
const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onload = callback;
  script.onerror = () => console.error(`Failed to load script: ${url}`);
  document.body.appendChild(script);
};

// Custom hook to handle Leaflet.Draw.Svg initialization
const useLeafletDrawSvg = () => {
  const map = useMap();

  useEffect(() => {
    loadScript('/path/to/leaflet.draw.js', () => {
      loadScript('/path/to/leaflet.draw.svg.js', () => {
        if (!L.Draw.Svg) {
          console.error('L.Draw.Svg is not defined');
          return;
        }

        // Define the custom SVG template
        const svgTemplate = `
          <line y2="153.934719" x2="266" y1="93.434721" x1="266" stroke-width="1.5" stroke="#ffffff" fill="none"/>
          <g>
            <title>PTR</title>
            <ellipse ry="18" rx="18" cy="171.753014" cx="266" fill-opacity="null" stroke-width="1.5" stroke="#ffffff" fill="none"/>
            <text stroke="#ffffff" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" y="186.66199" x="296" stroke-width="null" fill="#ffffff">T1</text>
            <ellipse id="svg_T1_b" ry="18" rx="18" cy="196.290907" cx="266" fill-opacity="null" stroke-width="1.5" stroke="#ffffff" fill="none"/>
          </g>
          <line stroke="#ffffff" stroke-linecap="undefined" stroke-linejoin="undefined" y2="256.43483" x2="266" y1="214.934859" x1="266" stroke-width="1.5" fill="none"/>
        `;

        // Extend L.Draw.Svg to include our custom behavior
        L.Draw.Svg.include({
          enable: function() {
            this._svgViewBox = "calculate";
            this._svgFitBounds = true;
            this._scale = 0.006;
            this._template = svgTemplate;

            // Call the parent enable function
            L.Draw.SimpleShape.prototype.enable.call(this);
          }
        });

        // Initialize the drawing control
        const editableLayers = new L.FeatureGroup();
        map.addLayer(editableLayers);

        const drawControl = new L.Control.Draw({
          position: 'topright',
          draw: {
            polyline: false,
            polygon: false,
            rectangle: true,
            circle: true,
            marker: true,
            svg: {
              icon: new L.DivIcon({
                iconSize: new L.Point(30, 30),
                className: 'leaflet-div-icon leaflet-editing-icon',
                html: '<div style="width: 30px; height: 30px; background-color: red; border: 1px solid black;"></div>'
              })
            }
          },
          edit: {
            featureGroup: editableLayers, // REQUIRED!!
            remove: true
          }
        });

        map.addControl(drawControl);

        map.on(L.Draw.Event.CREATED, function(e) {
          const layer = e.layer;
          editableLayers.addLayer(layer);
        });
      });
    });
  }, [map]);
};

// Component to initialize Leaflet.Draw.Svg
const InitializeLeafletDrawSvg = () => {
  useLeafletDrawSvg();
  return null;
};

// Main Map Component
const MapComponent = () => {
  const [clickedCoordinates, setClickedCoordinates] = useState(null);

  const handleRightClick = (e) => {
    setClickedCoordinates([e.latlng.lat, e.latlng.lng]);
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <MapContainer
        center={[27.6499, 85.2868]}
        zoom={10}
        minZoom={2}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          map.on('contextmenu', handleRightClick);
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <InitializeLeafletDrawSvg />
      </MapContainer>
      {clickedCoordinates && (
        <div style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'white', padding: '10px', borderRadius: '5px', zIndex: 1000 }}>
          <p>Coordinates:</p>
          <p>Latitude: {clickedCoordinates[0]}</p>
          <p>Longitude: {clickedCoordinates[1]}</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
