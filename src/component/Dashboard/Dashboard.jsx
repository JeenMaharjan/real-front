import React, { useEffect, useState } from 'react'
import './dasboard.css'
import MetaData from "../../MetaData";
import { MapContainer, TileLayer, Marker, Popup , useMap,Polyline,Circle ,CircleMarker , Polygon } from "react-leaflet";
import Navbar from "../Navbar/Navbar.jsx";
import { Input , Button, Form } from "antd";
import {  toast } from 'react-toastify';
import 'leaflet/dist/leaflet.css';
import "leaflet-measure";
// import MeasureControl from 'react-leaflet-measure';
import L from 'leaflet';
import { uploadProperty} from "../../action/property.js";
import { Icon, divIcon, point } from "leaflet";
import '../Mapdand/leaflet.MeasurePolygon.js';
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS
import 'leaflet-draw'; // Import Leaflet Draw JS
import ImageModel from '../ModelImage/ImageModel.jsx';
import VideoModel from '../ModelImage/VideoModel.jsx';
import '../Mapdand/leaflet-measure.css'
// Import the plugin's JS file
import MapClickPolygonHandler from '../Mapdand/MapClickPolygonHandler.jsx'

import {jwtDecode} from 'jwt-decode';
import "leaflet-rotate"; // Import leaflet-rotate

import Menu from "../Menu/Menu.jsx";
import { Table, Tag, Space } from 'antd';
import { useSelector } from 'react-redux';
// import { useSelector } from 'react-redux';


const { TextArea } = Input;

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2238/2238263.png",
//   iconUrl: require("./icons/placeholder.png"),
  iconSize: [27, 27 , true] ,// size of the icon
 
});


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

    return () => {
      map.removeControl(measurePolygonControl);
    };
  }, [map]);

  return null;
};




function Dashboard({history}) {
  const [clickedCoordinates, setClickedCoordinates] = useState(null);
  const { auth } = useSelector((state) => ({ ...state }));
  const [isMapClickHandlerActive, setIsMapClickHandlerActive] = useState(false);
  const [polygonColor, setPolygonColor] = useState("blue")
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [propertyTitle, setPropertyTitle] = useState("")
  const [images, setImages] = useState([])
  const [video, setVideo] = useState({})
  const [propertyLocation, setPropertyLocation] = useState("")
  const [propertyDesc, setPropertyDesc] = useState("")
  const [photoVisible, setPhotoVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);


const handleButtonClick = () => {
  setIsMapClickHandlerActive(!isMapClickHandlerActive);
  
};
useEffect(() => {
  const isAuthInvalid = !auth 

  if (!isAuthInvalid) {
    const decodedToken = jwtDecode(auth.token);
    const currentTime = Date.now() / 1000; // in seconds

    if (decodedToken.exp < currentTime) {
      history.push('/tst-admin');
      return;
    }
  } else {
    history.push('/tst-admin');
  }
}, [auth]);

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

const addPolygonCoordinate = (coordinate) => {
  setPolygonCoordinates((prevCoords) => [...prevCoords, coordinate]);
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};



const handlePressEnter = () => {
  setPolygonColor(inputValue);
  setInputValue("")
};

console.log(polygonCoordinates)

const handlePropertySubmit = async(e) => {
  e.preventDefault();
  
  if (
    propertyTitle.trim() === "" ||
    images.length === 0 ||
    !video ||
    propertyLocation.trim() === "" ||
    propertyDesc.trim() === "" ||
    polygonColor.trim() === "" ||
    polygonCoordinates.length === 0
  ) {
    alert("Please fill in all the fields and add a polygon.");
    return;
  }
  const propertyData = {
    title: propertyTitle,
    images: images,  // Make sure images are in the right format (e.g., URLs or base64)
    video: video,  // Ensure video is in the correct format (e.g., URL)
    location: propertyLocation,
    desc: propertyDesc,
    coordinate: polygonCoordinates,
    color: polygonColor,  // Assuming this is the color you set
  };
  try {
    const response = await uploadProperty(propertyData, auth?.token);
    if (response) {
      toast.success('Property uploaded successfully!');
      // Clear all form fields
      setPropertyTitle('');
      setImages([]);
      setVideo({});
      setPropertyLocation('');
      setPropertyDesc('');
      setPolygonCoordinates([]);
      setPolygonColor('blue');
      setInputValue('');
      setIsMapClickHandlerActive(false)
    }
  } catch (error) {
    toast.error('Failed to upload property. Please try again.');
  }
};

const handleClearPolygon = () => {
  if (window.confirm('Are you sure you want to clear the polygon coordinates?')) {
    setPolygonCoordinates([]);
  }
};


console.log(images)
  return (
    <>
    <MetaData title="Dashboard" />
      <div className='dashboard-container'>
        <div className="dashboard-navbar">
          <Navbar/>
        </div>
        <div className="dashboard-bottom">
          <div className="menu-container">
              <Menu/>
          </div>
          <div className="dashboard-items">
              <h1>Upload</h1>
              <form >
                <Input type="text" name="" onChange={(e) => setPropertyTitle(e.target.value)} 
                value={propertyTitle}
                className='form-input' placeholder='Enter Property Title' id="" />
                <Button className='form-button' onClick={() => setPhotoVisible(true)}>Upload Photo</Button>
                <Button className='form-button' onClick={() => setVideoVisible(true)}>Upload Video</Button>
                <Input type="text" name="" placeholder='Enter Location' id="" onChange={(e) => setPropertyLocation(e.target.value)} 
                value={propertyLocation}/>
                <TextArea  name="" placeholder='Property Details'  id="" onChange={(e) => setPropertyDesc(e.target.value)} 
                value={propertyDesc} />
                <div className="map-div">
                  <div className="map-options">
                  <Button onClick={handleButtonClick}>
                    {isMapClickHandlerActive ? 'Deactivate Polygon' : 'Activate Polygon'}
                  </Button>
              <Button onClick={handleClearPolygon}>
              Clear Polygon
              </Button>
    
                  <Input type="text" name=""   value={inputValue}
                    onChange={handleInputChange}
                    onPressEnter={handlePressEnter}   placeholder='Set Color' id="" />

                  </div>
                <MapContainer center={[27.649905973715104, 85.28681167734659]} zoom={10} minZoom={2} className='dasboard-map' rotate={false}
                  touchRotate={true}
                  style={{ width: '100%', height: '100%' }}
                 
                >
                      <TileLayer
                        url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                        maxZoom={20}
                        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                        attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                      />
                        {polygonCoordinates.length > 0 && (
                          <Polygon
                            positions={polygonCoordinates}
                            pathOptions={{ color: polygonColor, weight: 3 }}
                            
                          >
                              <Marker position={centroid} icon={customIcon}>
                        
                          </Marker>
                          </Polygon>
                          
                        )}
                         {
                        isMapClickHandlerActive  && (
                          <MapClickPolygonHandler setClickedCoordinates={setClickedCoordinates} addPolygonCoordinate={addPolygonCoordinate}/>
                        )
                      }


                </MapContainer>

                </div>
                <Button className='form-submit' onClick={handlePropertySubmit}>Submit</Button>
        
              </form>
          </div>
        </div>
    </div>
      <ImageModel 
      photoVisible={photoVisible} 
      setPhotoVisible={setPhotoVisible} 
      images={images} 
      setImages={setImages} 
      loading={loading}
      setLoading={setLoading}
      slug={propertyTitle}/>

      <VideoModel 
       videoVisible={videoVisible} 
       setVideoVisible={setVideoVisible}
       slug={propertyTitle} 
       loading={loading}
       setLoading={setLoading}
 
       video = {video}
       setVideo = {setVideo}
       />
    
    </>
  )
}

export default Dashboard