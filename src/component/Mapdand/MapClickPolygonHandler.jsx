import { useMapEvents } from 'react-leaflet';

const MapClickHandler = ({ setClickedCoordinates, addPolygonCoordinate  }) => {
  useMapEvents({
    click: (e) => {
        const newCoordinates = [e.latlng.lat, e.latlng.lng];
        setClickedCoordinates(newCoordinates);
        addPolygonCoordinate(newCoordinates);
    }
  });

  return null;
};

export default MapClickHandler;
