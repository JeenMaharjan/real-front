import React from 'react'
import './aboutus.css'

import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import profile1 from '../../assests/profile1.png'
import MetaData from "../../MetaData";

const teamMembers = [
  {
    id: 1 , 
    name: "Rajan Maharjan" , 
    work: "Engineer"
  },
  {
    id: 2 , 
    name: "Jeen Maharjan" , 
    work: "IT Adviser"
  },
  {
    id: 3 , 
    name: "Rajan Maharjan" , 
    work: "Engineer"
  },
  {
    id: 4 , 
    name: "Rajan Maharjan" , 
    work: "Engineer"
  },
  {
    id: 5 , 
    name: "Rajan Maharjan" , 
    work: "Engineer"
  },
  {
    id: 6 , 
    name: "Rajan Maharjan" , 
    work: "Engineer"
  },
]


function AboutUs() {
  return (
    <>
    <MetaData title="About Us" />
     <div className='aboutus-model'>
        <h1>About Us</h1>
        <p>
        At TST Real Estate, we pride ourselves on being a leading real estate company in Nepal. 
        Our mission is to transform landscapes into dreamscapes through our comprehensive services
        We are dedicated to creating exceptional living spaces that blend functionality with aesthetic appeal, 
        ensuring our clients' visions are brought to life with precision and creativity.</p>
        <div className="about-model-div">
                <h2>Our Team</h2>
                <div className="team-members">
                  {
                    teamMembers.map(t => (
                      <div className="each-member" key={t.id}>
                          <h2>{t.name}</h2>
                          <div className="member-div">
                            <div className="member-contact">
                           
                            <a href="whatsapp://send?phone=+9779761655210" target='_blank'><FaWhatsapp className='footer-social-icon'/></a>
                            <a href="mailto:tstrealestate1@gmail.com" target='_blank'><SiGmail className='footer-social-icon'/></a>
                            </div>
                          <img src={profile1} alt="" />
                          </div>
                          <h3>{t.work}</h3>
                      </div>
                    ))
                  }
                </div>
        </div>
       
    </div>
    </>
   
  )
}

export default AboutUs