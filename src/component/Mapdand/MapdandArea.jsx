import React, { useEffect } from "react";
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";


// Create custom icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
});

// Markers
const markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: "Hello, I am pop up 1"
  },
  {
    geocode: [48.85, 2.3522],
    popUp: "Hello, I am pop up 2"
  },
  {
    geocode: [48.855, 2.34],
    popUp: "Hello, I am pop up 3"
  }
];

const MeasureControl = () => {
  const map = useMap();

  useEffect(() => {
    // Set the localization object
    L.Measure = {
      linearMeasurement: "Distance measurement",
      areaMeasurement: "Area measurement",
      start: "开始",
      meter: "m",
      kilometer: "km",
      squareMeter: "m²",
      squareKilometers: "km²",
    };

    // Add the measure control to the map
    const measureControl = new L.Control.Measure({
      position: 'topright',
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'acres',
      activeColor: '#db4a29',
      completedColor: '#9b2d14'
    });

    measureControl.addTo(map);

    return () => {
      map.removeControl(measureControl);
    };
  }, [map]);

  return null;
};

export default function App() {
  return (
    <MapContainer 
      center={[29.749817, -95.080757]} 
      zoom={13} 
      editable={true}
      className='dashboard-map'
    >
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
        maxZoom={20}
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
      />
    
    </MapContainer>
  );
}
