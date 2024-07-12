import React, {useRef, useEffect, useState ,useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, ModalGateway } from "react-images";
import Gallery from "react-photo-gallery";
import Carousel from "react-images";
import { MapContainer, TileLayer, Marker, Popup , useMap,Polyline,Circle ,CircleMarker , Polygon } from "react-leaflet";
import property1 from '../../assests/property/1.png'
import property2 from '../../assests/property/2.png'
import property3 from '../../assests/property/3.png'
import { FaLocationDot } from "react-icons/fa6";
import property4 from '../../assests/property/4.png'
import property5 from '../../assests/property/5.jpg'
import property6 from '../../assests/property/6.png'
import video from '../../assests/video.mp4'
import Accordion from '@mui/material/Accordion';
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MetaData from "../../MetaData";
import ReactPlayer from "react-player";
import emailjs from '@emailjs/browser';
import { FaAngleDoubleDown } from "react-icons/fa";
import AccordionSummary from '@mui/material/AccordionSummary';
import { toast } from 'react-toastify';
import { AddNotification } from '../../action/notification';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Icon, divIcon, point } from "leaflet";
import { Swiper, SwiperSlide } from 'swiper/react';
import './propertyDisplay.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'leaflet-draw/dist/leaflet.draw.css'; // Import Leaflet Draw CSS
import 'leaflet-draw'; // Import Leaflet Draw JS
import 'leaflet/dist/leaflet.css';
import "leaflet-measure";


// import required modules
import { Pagination } from 'swiper/modules';
import { otherProperty, property } from '../../action/property';


const img= [
  property1,
  property2,
  property3,
  property4,
  property5,
  property6,
]


const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2238/2238263.png",
//   iconUrl: require("./icons/placeholder.png"),
  iconSize: [27, 27 , true] ,// size of the icon
 
});

const mark = `For More Information

CONTACT OUR TEAM on Phone/ Viber / WhatsApp:

9801969288

9802011921

9802308892

TST Real Estate.


Email : tstrealestate1@gmail.com`

const markdown = `New property alert!🔔

Introducing Godawari Bliss Valley!

Pre-booking is now open!

➢ 550M Away From Godawari Village Resort

➢ Peaceful Residential Area

➢ Rapidly Developing Area

➢ High Return On Investment


💰 Pre-Booking Price: 23 Lakhs/ Aana
*Price valid for a Limited Period Only


🌐 Visit our website: https://skventures.com.np/
📞 Contact us to schedule your site visit today!

9801969288
9802011921
9802308892
.`


const newarraival = [
  {
    id: 1,
    img: [
      property1,
      property2,
      property3,
      property4,
      property5,
      property6,
    ],
    title: "Chobar Kirtipur Real Estate, Land on Sale",
    location: "550M Away From Godawari Village Resort"
  },
  {
    id: 2,
    img: [
      property1,
      property2,
      property3,
      property4,
      property5,
      property6,
    ],
    title: "Godawari Kitini Bliss Valley, Land on Sale",
    location: "550M Away From Godawari Village Resort"
  },
  {
    id: 3,
    img: [
      property1,
      property2,
      property3,
      property4,
      property5,
      property6,
    ],
    title: "Chobar Kirtipur Real Estate, Land on Sale",
    location: "550M Away From Godawari Village Resort"
  },
  {
    id: 4,
    img: [
      property1,
      property2,
      property3,
      property4,
      property5,
      property6,
    ],
    title: "Chobar Kirtipur Real Estate, Land on Sale",
    location: "550M Away From Godawari Village Resort"
  },
  

]

function PropertyDisplay() {
  const form = useRef();
  const { slug } = useParams();
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [propertyTitle, setPropertyTitle] = useState("")
  const [propertyDesc, setPropertyDesc] = useState(``)
  const [contactDesc, setContactDesc] = useState('')
  const [images, setImages] = useState([])
  const [video, setVideo] = useState({})
  const [propertyLocation, setPropertyLocation] = useState("")
  const [polygonColor, setPolygonColor] = useState("blue")
  const [photoVisible, setPhotoVisible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);
  const [centroid, setCentroid] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sold, setSold] = useState(false)
  const [otherProperties, setOtherProperties] = useState([])

  let name = "27.630165459737935, 85.33743496709592"
  const encodedName = encodeURIComponent(name);
  const srcUrl = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodedName}&t=k&z=18&ie=UTF8&iwloc=B&output=embed`;
  console.log(slug)
  const handleDescChange = (value) => {
    setContactDesc(value)
  }
  const handleNewarraivalClick = (title) =>{
    const bookingRoute = `/property/${title}`;
   
    window.location.href = bookingRoute;

  }

  useEffect(() => {


    loadProperty();
    loadOtherProperty()
}, [slug]);



const loadProperty = async () => {
try {
    const singleProperty = await property(slug);
    console.log(singleProperty);

    // Destructure the properties you need from singleProperty
    const {
        coordinate,
        title,
        images,
        video,
        location,
        desc,
        color,
        sold
    } = singleProperty;

    // Populate the state variables accordingly
    setPolygonCoordinates(coordinate);
    setPropertyTitle(title);
    setImages(images);
    setVideo(video ? video : {});
    setPropertyLocation(location);
    setPropertyDesc(desc);
    setPolygonColor(color || 'blue'); // Default to 'blue' if color is not provided
    setSold(sold)
    setContactDesc(`I am interested in ${propertyTitle}.`)

} catch (error) {
    console.error('Error loading property:', error);
}
};

const loadOtherProperty = async () => {
  const other = await otherProperty(slug);
  setOtherProperties(other)
}


  const sendEmail = (e) => {
    e.preventDefault();

    if (!username || !email || !phone) {
      toast.info('Please fill in all fields.');
      return;
    }

    emailjs
      .sendForm('service_5zlzs6b', 'template_bfwrfdv', form.current, {
        publicKey: 'tK3zoe1e___rTmCRA',
      })
      .then(
        async() => {
          await AddNotification({
            title: `EMAIL FROM ${email}!!!!!!`,
            message: `${username} has mailed you. Contact to his number ${phone}`,
            
            read: false,
          } );
          toast.success('Email sent successfully!');
          setUsername("");
          setEmail("");
          setPhone("");

        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );

      
  };

  useEffect(() => {
    if (polygonCoordinates.length > 0) {
      calculateCentroid(polygonCoordinates);
    }
  }, [polygonCoordinates]);

  function calculateCentroid(polygonCoordinates) {
    if (!polygonCoordinates || polygonCoordinates.length === 0) {
      return setCentroid(null);
    }
  
    let x = 0;
    let y = 0;
    const length = polygonCoordinates.length;
  
    polygonCoordinates.forEach(([lat, lng]) => {
      x += lat;
      y += lng;
    });
  
    setCentroid([x / length, y / length]);
  }

  const openLightbox = useCallback((event, { image, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };
  
  return (
    <>
    {
      propertyTitle && (
        <div>
            <MetaData title={`${propertyTitle}`} />
    <div className='property-display-model'>
      <h1>{propertyTitle}</h1>
      <div className="project-display-main">
        <div className="project-display-left">
            <div className="project-slider">
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper1">
                      {
                        images?.map((image, index) => (
                          <SwiperSlide key={index} style={{cursor:"pointer"}}>
                            <img src={image?.Location} alt={propertyTitle} onClick={(e) => openLightbox(e, { image, index })} />
                          </SwiperSlide>
                        ))
                      }
                     
                    </Swiper>
            </div>
            <div className="property-descriotion">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<FaAngleDoubleDown />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{letterSpacing:"2px"}}
              >
                Property Details
              </AccordionSummary>
              <AccordionDetails>
                <Markdown className="property-details" remarkPlugins={[remarkGfm]}>{propertyDesc}</Markdown>
              </AccordionDetails>
            </Accordion>
           
            </div>
            <div className="property-map" >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<FaAngleDoubleDown />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{letterSpacing:"2px"}}
              >
                Property Location
              </AccordionSummary>
              <AccordionDetails>
              {centroid && centroid.length === 2 && !isNaN(centroid[0]) && !isNaN(centroid[1]) ? (
                <MapContainer center={centroid} zoom={17} minZoom={2} className='dasboard-map' rotate={false}
                  touchRotate={true}
                  style={{ width: '100%', height: '100vh' }}
                 
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
                        

                </MapContainer>
              ) : (
        <div>Loading map...</div>
      )}

              </AccordionDetails>
            </Accordion>
            </div>
            <div className="property-video">
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<FaAngleDoubleDown />}
                aria-controls="panel1-content"
                id="panel1-header"
                style={{letterSpacing:"2px"}}
              >
                Property Video
              </AccordionSummary>
              <AccordionDetails>
                <ReactPlayer
                    // ref={videoRef}
                    url={video?.Location}
                    width="100%"
                    height="440px"
                    controls
                    />
              </AccordionDetails>
            </Accordion>
            </div>
            
            <div className="property-contact" >
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<FaAngleDoubleDown />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Contact Our Team
              </AccordionSummary>
              <AccordionDetails>
                <Markdown className="property-contact" remarkPlugins={[remarkGfm]}>{mark}</Markdown>
              </AccordionDetails>
            </Accordion>
            </div>
        </div>

        <div className="property-display-contact">
          <div className="project-display-right">
           
           <h2>Contact Us For More Information</h2>
           <form ref={form} onSubmit={sendEmail}>
             
             <input type="text" placeholder='Full Name' name="name" 
             value={username} onChange={(e) => setUsername(e.target.value)} />
             <input type="number" placeholder='Phone Number' name="phone"
             value={phone} onChange={(e) => setPhone(e.target.value)} />
             <input type="email" placeholder='Email' name="email"
             value={email} onChange={(e) => setEmail(e.target.value)} />
             <textarea  id="" value={contactDesc} onChange={(e) => handleDescChange(e.target.value)} name="message"/>
             <label htmlFor="">For any inquiries or confusion, please call 9761655210. TST Real Estate is always here to guide you and provide assistance.</label>
             <button type="submit" value="Send">Send</button>
           </form>
          </div>
          <div className="other-property-model">
            <h3 style={{letterSpacing:"2px"}}>Other Properties</h3>
            {
                otherProperties?.map(n => (
                <div className="card" key={n?._id} onClick={() => handleNewarraivalClick(n?._id)}>
                  <div className='buy-status'>
                    <h2>For Sale!!</h2>
                  </div>
                  <div className="card-slider-div">
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                      {
                        n.images.map(i => (
                          <SwiperSlide >
                            <img src={i?.Location} alt={n?.title} />
                          </SwiperSlide>
                        ))
                      }
                     
                    </Swiper>
                  </div>
                  
                  <div className="content">
                    <h2>{n?.title}</h2>
                    <h3><FaLocationDot />{n?.location}</h3>
                  </div>
                </div>
                ))
              }
          </div>
        </div>
                     
      </div>
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={img.map(image => ({
                src: image || '', // Ensure src property is set
                srcset: '',
                caption: '',
                regular: '',
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
        </div>
      )
    }
    
    </>
    
  )
}

export default PropertyDisplay