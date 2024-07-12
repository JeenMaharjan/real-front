import React, {useRef, useEffect, useState } from 'react';
import { FaLocationDot ,FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { FiPhoneCall } from "react-icons/fi";
import { Pagination as AntdPagination } from 'antd';
import civil from '../../assests/civil.jpg'
import design from '../../assests/design.webp'
import banner from '../../assests/banner.png'
import area from '../../assests/area.jpg'
import property1 from '../../assests/property/1.png'
import property2 from '../../assests/property/2.png'
import property3 from '../../assests/property/3.png'
import property4 from '../../assests/property/4.png'
import property5 from '../../assests/property/5.jpg'
import { motion ,  useAnimation} from "framer-motion";
import property6 from '../../assests/property/6.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import MetaData from "../../MetaData";
import homeimage1 from '../../assests/homepageimg/3.jpg'
import homeimage2 from '../../assests/homepageimg/4.jpg'
import homeimage3 from '../../assests/homepageimg/5.jpg'
import homeimage4 from '../../assests/homepageimg/11.jpg'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { FreeMode, Navigation, Thumbs ,Autoplay ,Pagination,EffectFade} from 'swiper/modules';


// import required modules

import './home.css'
import { getProducts, getPropertyCount, getSoldProducts } from '../../action/property';

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

const img= [

  homeimage2,
  homeimage3,
  homeimage4,
]


function Home({history}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [textContent, setTextContent] = useState('TST');
  const [wordContent, setWordContent] = useState('REAL ESTATE');
  const [currentSoldPage, setCurrentSoldPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [translatePercentage, setTranslatePercentage] = useState(25);
      const [page, setPage] = useState(1);
      const [pageSold, setPageSold] = useState(1);
      const [perPage, setPerPage] = useState(3)
      const [unsoldTotal, setUnsoldTotal] = useState(1)
      const [products, setProducts] = useState([]);
      const [soldTotal, setSoldTotal] = useState(1)
      const [productsSold, setProductsSold] = useState([]);
      const [loading, setLoading] = useState(false);
    console.log(page)
    useEffect(() => {
      const updateItemsPerPage = () => {
        if (window.innerWidth <= 768) {
          setPerPage(1)
        } else {
          setPerPage(3)
        }
      };
  
      // Initial check
      updateItemsPerPage();
  
      // Update on window resize
      window.addEventListener('resize', updateItemsPerPage);
  
      // Cleanup event listener on component unmount
      return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [page , pageSold]);

    useEffect(() => {
      loadAllProducts();
      loadAllSoldProducts()
      propertyCount()
    }, [page , pageSold]);

    const loadAllProducts = () => {
      setLoading(true);
      // sort, order, limit
      getProducts("createdAt", "desc", page , perPage ).then((res) => {
        setProducts(res.data);
        setLoading(false);
      });
    };

    const propertyCount = async () => {
      try {
        const { sold, notSold } = await getPropertyCount();
        setSoldTotal(sold);
        setUnsoldTotal(notSold);
      } catch (error) {
        console.error('Error fetching property counts:', error);
      }
    };

    const loadAllSoldProducts = () => {
      setLoading(true);
      // sort, order, limit
      getSoldProducts("createdAt", "desc", pageSold , perPage ).then((res) => {
        setProductsSold(res.data);
        setLoading(false);
      });
    };

    
    console.log(products)

  const totalPages = Math.ceil(newarraival.length / itemsPerPage);

  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const handleButtonsoldClick = (page) => {
    setCurrentSoldPage(page);
  };

  const handleNewarraivalClick = (title) =>{
    
    history.push(`/property/${title}`)
  

  }


  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.5, // Adjust the stagger time as needed
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 1, // Duration of the fade-in animation
      },
    },
  };



 
  return (
    <>
    <MetaData title="TST Real Estate" />
    <div className='home-page-model'>
      <div className='home-model'>
      <motion.div
      className="decoration-img"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img src={design} alt="TST real estate" variants={itemVariants} />
      <motion.img src={area} alt="TST real estate" variants={itemVariants} />
      <motion.img src={civil} alt="TST real estate" variants={itemVariants} />
    </motion.div>
        <div className="home-model-left">
          <div className="left-title-part">
            <h1>
            {Array.from(textContent).map((char, index) => (
                        
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: -20 }}
                          // animate={{ opacity: frontTopInView ? 1 : 0, y: frontTopInView ? 0 : -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * .9  }}
                          style={{ display: 'inline-block' }}
                          
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
            </h1>
         
          <h2>REAL ESTATE</h2>
              
          </div>
          <div className="left-services-part">
            <h2>हाम्रो सेवाहरू</h2>
            <div className="service-divide">
            <div className='service-divide-content'>
            
              <p><span>✔</span>जग्गा / नक्सा नाप जाचँ​</p>
              <p><span>✔</span>अंशबन्डा कित्ता-कात​</p>
              <p><span>✔</span>Ploting Design</p>
              <p><span>✔</span>House Design</p>
            </div>
            <div className='service-divide-content'>
             
              <p><span>✔</span>Area Survey</p>
              <p><span>✔</span>Land Survey​</p>
              <p><span>✔</span>Topographical Survey</p>
              <p><span>✔</span>Construction Layout</p>
            </div>
            </div>
          
          </div>
          <div className="model-left-contact-part">
            <h2>Contact Us</h2>
            <div className="contact-details-number">
              <FaWhatsapp className='phone-call-icon'/>
       
              <a href="whatsapp://send?phone=+9779851362144" className="each-number">
                <h2>Surveyor</h2>
                <p>9851362144</p>
              </a>
             
           

              <a href="whatsapp://send?phone=+9779706096060" className="each-number">
                <h2>Engineer</h2>
                <p>9706096060</p>
              </a>
       


              <a href="whatsapp://send?phone=+9779761655210" className="each-number">
                <h2>Consultant</h2>
                <p>9761655210</p>
              </a>
           
            </div>
          </div>
        </div>
        <div className="home-model-right">
        <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
        
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        spaceBetween={10}
        // navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode,EffectFade, Navigation,Pagination, Thumbs , Autoplay]}
        className="mySwiper2"
      > 
        {
            img.map(i =>(
                <SwiperSlide className='swiper-main-image'>
          <img src={i} />
        </SwiperSlide>
            ))
        }
        
      </Swiper>
        </div>
      </div>
      <div className="new-arrival-model">
        <h2>New Property</h2>
        <div className="center">
          <div className="wrapper">
            <div className="inner" style={{ transform: `translateX(${-(currentPage - 1) * translatePercentage}%)` }}>
              {
                products?.map(n => (
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

          <div className="map">
          <AntdPagination defaultCurrent={1} total={unsoldTotal} pageSize={perPage} onChange={(value) => setPage(value)}/>
          </div>
        </div>
      </div>
      <div className="new-arrival-model">
        <h2>Sold Property</h2>
        <div className="center">
          <div className="wrapper">
            <div className="inner" style={{ transform: `translateX(${-(currentSoldPage - 1) * translatePercentage}%)` }}>
            {
                productsSold?.map(n => (
                <div className="card" key={n?._id} onClick={() => handleNewarraivalClick(n?._id)}>
                  <div className='buy-status'>
                    <h2 className='sold'>Sold!!</h2>
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

          <div className="map">
            <AntdPagination defaultCurrent={1} total={soldTotal} pageSize={perPage} onChange={(value) => setPageSold(value)}/>
          </div>
        </div>
      </div>
      <div className="home-model-banner">
        <div className="banner-container">
          <img  src={banner} alt="" />
          <h2>Trust TST Real Estate - Your Source for Verified and Secure Property Investments</h2>
          <p>Discover your perfect home with TST Real Estate. We offer verified properties you can trust, ensuring a secure 
            investment for your future. TST Real Estate is not just a service; we are your trusted advisor and counselor, 
            providing reliable and flexible solutions tailored to your needs. Let us guide you through every step of the real 
            estate journey with confidence and peace of mind.</p>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default Home