import { useMapEvents } from 'react-leaflet';

const MapClickHandler = ({ setClickedCoordinates, addCircleCoordinate  }) => {
  useMapEvents({
    click: (e) => {
        const newCoordinates = [e.latlng.lat, e.latlng.lng];
        const newCoordinate = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          color: 'green', // Example color
          popupDesc: 'New Circle Marker',
          radius: 30 // Example radius
        };
        setClickedCoordinates(newCoordinates);
        addCircleCoordinate(newCoordinate);
    }
  });

  return null;
};

export default MapClickHandler;
