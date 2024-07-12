import { useMapEvents } from 'react-leaflet';

const MapClickHandler = ({ setClickedCoordinates, addPolylineCoordinate  }) => {
  useMapEvents({
    click: (e) => {
        const newCoordinates = [e.latlng.lat, e.latlng.lng];
        setClickedCoordinates(newCoordinates);
        addPolylineCoordinate(newCoordinates);
    }
  });

  return null;
};

export default MapClickHandler;
