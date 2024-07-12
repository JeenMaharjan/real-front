import "./navbar.css";
import { IoIosLogOut } from "react-icons/io";
import { toast } from 'react-toastify';
import logo from '../../assests/TST logo.svg'
// import { useDispatch, useSelector } from "react-redux";
import { BsFillBellFill } from 'react-icons/bs';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import { GetAllNotifications, ReadAllNotifications , DeleteNotification } from "../../action/notification";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const { auth } = useSelector((state) => ({ ...state }));
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    history.push("/tst-admin");
  };
  console.log(notifications)
  const getNotifications = async () => {
    try {
     
      const response = await GetAllNotifications();

      if (response.success) {
        setNotifications(response.data);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotifications();

      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {

       getNotifications();



    
  }, []);

  const handleNotificationDelete = async (id) => {
    // Show a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this notification?');
  
    if (confirmed) {
      try {
        const deleteNotification = await DeleteNotification(id, auth?.token);
        setShowNotifications(false)
        getNotifications()
        toast.success('Notification deleted successfully!');
      } catch (error) {
        console.error('Error deleting notification:', error);
        toast.error('Error deleting notification. Please try again.');
      }
    } else {
      // User canceled the deletion
      toast.info('Deletion canceled.');
    }
  };
  
  const handleLogoClick = () => {
    
    history.push("/");
  };
  
  return (
     <div className="navbar">
       <div className="logo">
         <img className="dashboard-nav-logo" onClick={handleLogoClick} src={logo} alt="" />
       
       </div>
       <div className="icons">
           
         <div className='notification'>
         <BsFillBellFill className='noti' onClick={() => { readNotifications(); setShowNotifications(true); }}/>
         {notifications?.filter((notification) => !notification.read).length ? <span className='notifiation-length'>{notifications?.filter((notification) => !notification.read).length}</span> : <div></div>}
            </div>
         <div className="user" onClick={logout}>
          <span >Logout</span>
         <IoIosLogOut className="dasboard-logout"/>
        </div>
        
        </div>
        <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
    >
 
 {
        notifications.map((notification) => (
          <div class="flex-container">
          <div class="header-section">
            <div class="notification-content" >
              <h1 class="title">{notification.title}</h1>
              <span class="message">{notification.message}</span>
              <h1 class="timestamp"></h1>
            </div>
            <i class="delete-icon" onClick={() =>handleNotificationDelete(notification._id)}>Delete</i>
          </div>
        </div>
        ))
      }
      
      
    </Modal>
     </div>
  )
}

export default Navbar