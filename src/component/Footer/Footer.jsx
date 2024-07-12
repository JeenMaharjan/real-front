import React from 'react'
import logo from '../../assests/TST logo.svg';
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineFacebook } from "react-icons/ai";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SiGmail } from "react-icons/si";
import "./footer.css"

function Footer() {
  const history = useHistory()
  const handleLogoClick = () => {

    history.push("/")
   
  
  };

  const handleAboutClick = () => {

    history.push("/about-us")
    
  
  };

  const handlePropertyClick = () => {

    history.push("/property-list")

  
  };

  const handleEMIClick = () => {

    history.push("/emi-calculator")

  };

  const handleAREAClick = () => {

    history.push("/area-converter")

  
  };

  const handleContactClick = () => {

    history.push("/contact")

  
  };

  return (
    <footer class="footer">
      <div className="footer-header">
        <a href="#" onClick={handleLogoClick}>Home</a>
        <a href="#" onClick={handleAboutClick}>About Us</a>
        <a href="#" onClick={handlePropertyClick}>Properties</a>
        
        <a href="#" onClick={handleContactClick}>Contact Us</a>
      </div>
			<img src={logo} alt="" />
      <p>The Sharp Three  (TST) real estate specializes in owning and managing its own properties, without offering brokerage services. 
        Through its brand, TST real estate - Properties, it focuses on marketing all properties owned by The Sharp Three (TST) real estate.</p>
      <div className="footer-social">
        <a target='_blank' href="https://www.facebook.com/profile.php?id=61554883197497"><AiOutlineFacebook className='footer-social-icon'/></a>
        <a href="whatsapp://send?phone=+9779761655210"><FaWhatsapp className='footer-social-icon'/></a>
        <a href="mailto:tstrealestate1@gmail.com"><SiGmail className='footer-social-icon'/></a>
        <a href="https://www.instagram.com/tst_real_estate/"><FaInstagram className='footer-social-icon'/></a>
      </div>
      <span className='design-develop'> 𝒟𝑒𝓋𝑒𝓁𝑜𝓅𝑒𝒹 𝒷𝓎 𝐸𝓇. 𝒥𝑒𝑒𝓃 𝑀𝒶𝒽𝒶𝓇𝒿𝒶𝓃 </span>
		</footer>
  )
}

export default Footer