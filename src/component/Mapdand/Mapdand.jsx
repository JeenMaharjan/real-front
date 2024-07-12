
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup , useMap,Polyline,Circle ,CircleMarker , Polygon , withLeaflet} from "react-leaflet";

import L from 'leaflet';
// import { Polygon } from 'react-leaflet/Polygon'
// import { Polyline } from 'react-leaflet/Polyline'
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'leaflet/dist/leaflet.css';
import "leaflet-measure";
// import MeasureControl from 'react-leaflet-measure';
import './Leaflet.LinearMeasurement.css'; // Assuming you've placed the CSS file in the same folder
import './styles.css';
import './leaflet-measure-path.css'
import './leaflet.MeasurePolygon.js';
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS
import 'leaflet-draw'; // Import Leaflet Draw JS
import PinSearchControl from './PinSearchControl.jsx';
import './leaflet-measure.css'
// Import the plugin's JS file
import './Leaflet.LinearMeasurement.js';
import MapClickHandler from './MapClickHandler.jsx'; // Import the new component
import MapClickCircleHandler from './MapClickCircleHandler.jsx'; // Import the new component
import MapClickPolygonHandler from './MapClickPolygonHandler.jsx'; // Import the new component
import "leaflet-rotate"; // Import leaflet-rotate
// import 'leaflet-editable'; 
// create custom icon
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2238/2238263.png",
//   iconUrl: require("./icons/placeholder.png"),
  iconSize: [27, 27 , true] ,// size of the icon
 
});



delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
});




// custom cluster icon
const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};




const mapdand = [
  {

      id: 1,
      polygoncontent : {
        polygon : [
          [27.64523010276538, 85.28659710064125],
          [27.649905973715104, 85.28599628586628],
          [27.652795029829626, 85.28801330689654],
          [27.650248102765275, 85.28839954496617],
          [27.64640859314684, 85.2879274762144],
        ],
        color: "red"
      },
      title:"नदीकिनारको निर्माण नियम: सुरक्षित दूरी र जग्गाको बढ्दो मूल्य!",
      markerPosition : [27.649905973715104, 85.28681167734659],
      desc: "नदीको बिचबाट दुबै तर्फ २० मिटरको दूरीमा मात्र घर निर्माण गर्न अनुमति छ। जग्गाको मूल्य हरेक वर्ष १०% ले बढ्दो छ।",
 
  },
  {
    
      id: 2,
      polygoncontent : {
        polygon : [
          [27.635383509177643, 85.23192295160004],
          [27.629148142563302, 85.22582897316816],
          [27.623901034472574, 85.218962518597],
          [27.617132654106406, 85.21621593676852],
        
          [27.61135258243329, 85.215271799265],
          [27.612569464975433, 85.20917782083309],
          [27.619338127366753, 85.21261104811866],
          [27.6342429198819, 85.21741756631849],
        ],
        color: "blue"
      },
      title:"वन विनाश: सिमेन्ट उद्योगको लागि भूमि र मूल्य वृद्धि",
      markerPosition : [27.62979450804454, 85.2213657776969],
      desc: "सिमेन्ट उद्योगका लागि वन विनाश हुँदैछ, जसले जग्गाको मूल्य बढाउनेछ।",
   
  },

  {
    
    id: 3,
    polygoncontent : {
      polygon : [
        [27.557682230819736, 85.62811738398067],
        [27.48963419519405, 85.58554536563949],
        [27.51673666900142, 85.54486162230539],
        [27.538961803884487, 85.55584794961923],
      
      ],
      color: "green"
    },
    title:"land mark",
    markerPosition : [27.52746923005739, 85.55722124053347],
    desc: `सिमेन्ट उद्योगका लागि वन विनाश हुँदैछ, जसले जग्गाको मूल्य बढाउनेछ।

      ➢ 550M Away From Godawari Village Resort
    `,
 
},




]








const MapMeasureControl = () => {
  const map = useMap();

  useEffect(() => {
    const cost_underground = 10;
    const cost_above_ground = 0;
    const html = [
      '<p>Total area</p>',
      
    ].join('');
    const numberWithCommas = function(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const Ruler = L.Control.LinearMeasurement.extend({
      layerSelected: function(e) {
        var distance = e.total.scalar;
        if (e.total.unit === 'mi') {
          distance *= e.sub_unit;
        } else if (e.total.unit === 'km') {
          distance *= 3280.84;
        } else if (e.total.unit === 'm') {
          distance *= 3.28084;
        }

        const data = {
          total_above_ground: numberWithCommas(L.Util.formatNum(cost_above_ground * distance, 2)),
          total_underground: numberWithCommas(L.Util.formatNum(cost_underground * distance, 2))
        };

        const content = L.Util.template(html, data);
        const popup = L.popup().setContent(content);

        e.total_label.bindPopup(popup, { offset: [45, 0] });
        e.total_label.openPopup();
      }
    });

    const measureControl = new Ruler({
      unitSystem: 'metric',
      color: '#FF0080'
    });

    map.addControl(measureControl);

    return () => {
      map.removeControl(measureControl);
    };
  }, [map]);

  return null;
};

const MeasurePolygonControl = () => {
  const map = useMap();

  useEffect(() => {
    const measurePolygonControl = new L.Control.MeasurePolygon({
      position: "topleft",
      icon_active: "https://img.icons8.com/?size=48&id=98497&format=png",
      icon_inactive: "https://img.icons8.com/?size=48&id=98463&format=png",
      color_polygon: "blue",
      fillColor_polygon: "green",
      weight_polygon: 5,
      msj_disable_tool: "Do you want to disable the tool?",
    });

    map.addControl(measurePolygonControl);

    let touchStartTime;

    // Function to handle touchstart event
    const handleTouchStart = () => {
      touchStartTime = Date.now();
    };

    // Function to handle touchend event
    const handleTouchEnd = (e) => {
      const touchDuration = Date.now() - touchStartTime;
      if (touchDuration < 1000) {
        e.originalEvent.preventDefault();
        e.originalEvent.stopPropagation();
        measurePolygonControl._toggleMeasure();
      }
    };

    map.on('touchstart', handleTouchStart);
    map.on('touchend', handleTouchEnd);

    return () => {
      map.off('touchstart', handleTouchStart);
      map.off('touchend', handleTouchEnd);
      map.removeControl(measurePolygonControl);
    };
  }, [map]);

  return null;
};


// markers
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




function Mapdand() {
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const [isMapClickHandlerActive, setIsMapClickHandlerActive] = useState(false);
  const [isMapClickHandlerCircleActive, setIsMapClickHandlerCircleActive] = useState(false);
  const [isMapClickHandlerPolygonActive, setIsMapClickHandlerPolygonActive] = useState(false);
  const [polylineCoordinates, setPolylineCoordinates] = useState([]);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [circleMarkerCoordinates, setCircleMarkerCoordinates] = useState([

]);
  const [selectedCircleIndex, setSelectedCircleIndex] = useState(null);
  const [inputValues, setInputValues] = useState({
    radius: '',
    color: '',
    popupDesc: ''
  });

  console.log(circleMarkerCoordinates)

  // Function to handle circle marker click
  const handleCircleMarkerClick = (index) => {
    setSelectedCircleIndex(index);
    const selectedCircle = circleMarkerCoordinates[index];
    setInputValues({
      radius: selectedCircle.radius,
      color: selectedCircle.color,
      popupDesc: selectedCircle.popupDesc
    });
  };

  const handlePolylineMarkerClick = () => {
      console.log("hello")
  };

  // Function to update circle marker properties
  const handleUpdateCircleMarker = () => {
    if (selectedCircleIndex !== null) {
      setCircleMarkerCoordinates  ((prevMarkers) =>
        prevMarkers.map((marker, index) =>
          index === selectedCircleIndex
            ? {
                ...marker,
                radius: parseInt(inputValues.radius),
                color: inputValues.color,
                popupDesc: inputValues.popupDesc
              }
            : marker
        )
      );
    }
  };

  // JSX for circle marker input form
  const renderCircleMarkerForm = () => (
    <div className="circle-marker-form">
      <h3>Edit Circle Marker</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateCircleMarker(); }}>
        <label>Radius:</label>
        <input
          type="number"
          value={inputValues.radius}
          onChange={(e) => setInputValues({ ...inputValues, radius: e.target.value })}
        />
        <label>Color:</label>
        <input
          type="text"
          value={inputValues.color}
          onChange={(e) => setInputValues({ ...inputValues, color: e.target.value })}
        />
        <label>Popup Description:</label>
        <textarea
          value={inputValues.popupDesc}
          onChange={(e) => setInputValues({ ...inputValues, popupDesc: e.target.value })}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
  console.log(circleMarkerCoordinates)

  const handleButtonClick = () => {
    setIsMapClickHandlerActive(!isMapClickHandlerActive);
    setIsMapClickHandlerCircleActive(false);
    setIsMapClickHandlerPolygonActive(false);
  };

  const handleCircleButtonClick = () => {
    setIsMapClickHandlerCircleActive(!isMapClickHandlerCircleActive);
    setIsMapClickHandlerActive(false);
    setIsMapClickHandlerPolygonActive(false);
  };

  const handlePolygonButtonClick = () => {
    setIsMapClickHandlerCircleActive(false);
    setIsMapClickHandlerActive(false);
    setIsMapClickHandlerPolygonActive(!isMapClickHandlerPolygonActive);
  };

  function calculateCentroid(polygonCoordinates) {
    let x = 0;
    let y = 0;
    const length = polygonCoordinates?.length;
  
    polygonCoordinates?.forEach(([lat, lng]) => {
      x += lat;
      y += lng;
    });
  
    return [x / length, y / length];
  }

  const centroid = calculateCentroid(polygonCoordinates);

  useEffect(() => {
      calculateCentroid()
  }, [polygonCoordinates])
  



  const addPolylineCoordinate = (coordinate) => {
    setPolylineCoordinates((prevCoords) => [...prevCoords, coordinate]);
  };

  const addPolygonCoordinate = (coordinate) => {
    setPolygonCoordinates((prevCoords) => [...prevCoords, coordinate]);
  };

  const addCircleCoordinate = (coordinate) => {
    setCircleMarkerCoordinates((prevCoords) => [...prevCoords, coordinate]);
  };

  


  useEffect(() => {
    if (clickedCoordinates) {
      console.log("Clicked Coordinates:", clickedCoordinates);
    }
  }, [clickedCoordinates]);

  console.log(clickedCoordinates)
  return (
    <div className="mapdand-model">
        <div className="mapdand-content">
            <h1>जग्गा मापदण्ड</h1>
            <p> <span>NOTE</span>: All the informations are collected through careful inspections, several site visits, and detailed surveys. 
              Our skilled engineers and surveyors study current land prices, predict future changes, and evaluate other 
              advantages of the land. This thorough process ensures accurate and reliable information. Our team constantly 
              monitors market trends and environmental factors to provide the most up-to-date data. This comprehensive approach 
              helps in making informed decisions, maximizing investment potential, and reducing risks in real estate projects.</p>
              {/* <button onClick={handleButtonClick}>
        {isMapClickHandlerActive ? 'Deactivate Click Handler' : 'Activate Click Handler'}
      </button>
      <button onClick={handleCircleButtonClick}>Activate Circle Marker Click Handler</button>
      <button onClick={handlePolygonButtonClick}>Activate polygon</button>
      {selectedCircleIndex !== null && (
          <div className="circle-marker-form-container">
            {renderCircleMarkerForm()}
          </div>
        )} */}
        </div>
         <MapContainer center={[27.649905973715104, 85.28681167734659]} zoom={10} minZoom={2}      rotate={true}
        touchRotate={false}
        rotateControl={{
          closeOnZeroBearing: false
        }}
        shiftKeyRotate= {false}
      
      >
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
    url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    maxZoom={20}
    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
  />
  {/* OpenStreetMap TileLayer for Street Names */}

     
      {
        mapdand.map((maap) => (
          <MarkerClusterGroup
              
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
        key={maap.id}
      >
        
        <Polygon positions={maap.polygoncontent.polygon}  pathOptions={{ color:  `${maap.polygoncontent.color}`, weight: 3, fillColor: `${maap.polygoncontent.color}`, fillOpacity: 0.4 }} />
        
        <Marker position={maap.markerPosition} icon={customIcon} title={maap.title}>
          <Popup>
              <h3>{maap.title}</h3>
            <Markdown className="maapdand-details" remarkPlugins={[remarkGfm]}>{maap.desc}</Markdown>
          </Popup>
        </Marker>
       </MarkerClusterGroup>
        ))
        
      } 
       {circleMarkerCoordinates.map((position, index) => (
          <Circle
            key={index}
            center={[position.lat, position.lng]}
            pathOptions={{  fillColor: position.color, color: 'blue' , fillOpacity:".3"}}
            radius={position.radius}
            eventHandlers={{
              click: () => handleCircleMarkerClick(index),
            }}
          >
            <Marker position={[position.lat, position.lng]} icon={customIcon}>
            <Popup>
            <Markdown className="maapdand-details" remarkPlugins={[remarkGfm]}>{position.popupDesc}</Markdown>
          </Popup>
            </Marker>
          </Circle>
        ))}
            {/* <Polyline/> */}
            {polylineCoordinates.length > 0 && (
          <Polyline
            positions={polylineCoordinates}
            pathOptions={{ color: 'blue', weight: 7 }}
            eventHandlers={{
              click: () => handlePolylineMarkerClick(),
            }}
          >
     
            <Popup>
              <Markdown className="maapdand-details" remarkPlugins={[remarkGfm]}>area</Markdown>
            </Popup>
       
          </Polyline>
          
        )}

{polygonCoordinates.length > 0 && (
          <Polygon
            positions={polygonCoordinates}
            pathOptions={{ color: 'blue', weight: 3 }}
            
          >
               <Marker position={centroid} icon={customIcon}>
            <Popup>
              <Markdown className="maapdand-details" remarkPlugins={[remarkGfm]}>area</Markdown>
            </Popup>
          </Marker>
          </Polygon>
          
        )}
            {isMapClickHandlerActive && (
          <MapClickHandler setClickedCoordinates={setClickedCoordinates} addPolylineCoordinate={addPolylineCoordinate}/>
        )}
        {isMapClickHandlerCircleActive && (
          <MapClickCircleHandler setClickedCoordinates={setClickedCoordinates} addCircleCoordinate={addCircleCoordinate}/>
        )}
        {
          isMapClickHandlerPolygonActive  && (
            <MapClickPolygonHandler setClickedCoordinates={setClickedCoordinates} addPolygonCoordinate={addPolygonCoordinate}/>
          )
        }
        {/* <MeasureControl/> */}
       <MapMeasureControl />
       <MeasurePolygonControl />
      {/* <RotateControl /> */}
       <PinSearchControl markers={mapdand} className="search-bar-map"/>
    </MapContainer>
 
    </div>
   
  );
}


export default Mapdand