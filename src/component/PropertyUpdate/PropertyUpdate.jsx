import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Menu from '../Menu/Menu'
import MetaData from '../../MetaData'
import BookList from "../BookList/BookList.jsx";
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';

function PropertyUpdate({history}) {
  const { auth } = useSelector((state) => ({ ...state }));

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
            <BookList/>
          </div>
        </div>
    </div>

    
    </>
  )
}

export default PropertyUpdate