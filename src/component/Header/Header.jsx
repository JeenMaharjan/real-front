import React, { useState } from 'react';
import {useHistory} from 'react-router-dom'
import logo from '../../assests/TST logo.svg';
import { FaHome } from "react-icons/fa";
import './header.css';

function Header() {
  const history = useHistory()
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleLogoClick = () => {

    history.push("/")
    setMenuActive(false)
  
  };

  const handleAboutClick = () => {

    history.push("/about-us")
    setMenuActive(false)
  
  };

  const handlePropertyClick = () => {

    history.push("/property-list")
    setMenuActive(false)
  
  };

  const handleEMIClick = () => {

    history.push("/emi-calculator")
    setMenuActive(false)
  
  };

  const handleAREAClick = () => {

    history.push("/area-converter")
    setMenuActive(false)
  
  };

  const handleMapdandClick = () => {

    history.push("/मापदण्ड")
    setMenuActive(false)
  
  };

  

  const handleContactClick = () => {

    history.push("/contact")
    setMenuActive(false)
  
  };


  return (
    <div className='main-header'>
        <div className="handburgur-model">
        <button className="nav-tgl" type="button"  onClick={toggleMenu}>
        <FaHome className={`nav-logo ${menuActive ? 'active' : ''}`}/>
        </button>
          <div className={`menu ${menuActive ? 'active' : ''}`}>
          
            <nav className="nav">
            
            </nav>
          </div>
        </div>
      <div className={`header-model`}>
        <img className='header-model-logo' src={logo} alt="TST Logo"  style={{cursor:"pointer" }} onClick={handleLogoClick}/>
        
        
     
      </div>
      <div className={`activenav-model ${menuActive ? 'active' : ''}`}>
        <div className="activenav-left">
          <div className="active-left-title">
            <h2>Turning Dreams into Addresses.</h2>
          </div>
          <div className="active-left-details">
            <a href="whatsapp://send?phone=+9779761655210"><h2>+977 9761655210</h2></a>
            <a href="mailto:tstrealestate1@gmail.com"><h2>tstrealestate1@gmail.com</h2></a>
            
         
            <h2>Lagankhel, Lalitpur, Nepal</h2>
          </div>
          <div className="active-left-social">
              <a  href="https://www.facebook.com/profile.php?id=61554883197497" target='_blank'><h3>facebook</h3></a>
              <h3>|</h3>
              <a href="https://www.instagram.com/tst_real_estate/" target='_blank'><h3>instagram</h3></a> 
          </div>
          <img className='activenav-logo' src={logo} alt="TST Logo"  style={{cursor:"pointer" }} onClick={handleLogoClick}/>
        </div>
        <div className="activenav-right">
          <h2 onClick={handleLogoClick}>Home</h2>
          <h2 onClick={handleMapdandClick} className='header-mapdand'>जग्गा मापदण्ड</h2>
          <h2 onClick={handlePropertyClick}>Properties</h2>
          <h2 onClick={handleEMIClick}>EMI Calculator</h2>
          <h2  onClick={handleAREAClick}>Area Converter</h2>
          <h2 onClick={handleAboutClick}>About Us</h2>
          <h2  onClick={handleContactClick}>Contact Us</h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
