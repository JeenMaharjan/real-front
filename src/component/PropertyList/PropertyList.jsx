import React, { useState } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import property1 from '../../assests/property/1.png'
import property2 from '../../assests/property/2.png'
import property3 from '../../assests/property/3.png'
import MetaData from "../../MetaData";
import property4 from '../../assests/property/4.png'
import property5 from '../../assests/property/5.jpg'
import property6 from '../../assests/property/6.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { allProperties  } from "../../action/property";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';
import './propertylist.css'
import { useEffect } from 'react';


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
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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

function PropertyList({history}) {
  const [properties, setProperties] = useState([])

  const handleNewarraivalClick = (title) =>{
    
    history.push(`/property/${title}`)
  

  }

  
  useEffect(() => {
    
    loadPhotoAggregate()
  
}, [])

const loadPhotoAggregate = async() =>{

  try {
    const singlePhotoCategory = await allProperties()
  


  setProperties(singlePhotoCategory);
  
} catch (error) {
  
}
}
console.log(properties)
  return (
    <>
    <MetaData title="Property list" />
       <div className='propertylist-model'>
      <h1>Property list</h1>
      <div className="properties-container">
      {
                properties?.map(n => (
                <div className="card" key={n?._id} onClick={() => handleNewarraivalClick(n?._id)}>
                  <div className='buy-status'>
                    <h2 >{n?.sold ? "sold" : "for sale"}</h2>
                  </div>
                  <div className="card-slider-div">
                    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                      {
                        n?.images?.map(i => (
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
    </>
   
  )
}

export default PropertyList