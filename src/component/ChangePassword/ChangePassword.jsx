import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import logo from '../../assests/TST logo.svg'
import MetaData from "../../MetaData";
import { changePassword } from '../../action/auth'
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

function ChangePassword({history}) {
  const [username, setUsername] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleLogin = async() =>{

      try {
      let res = await changePassword({ username, oldPassword , newPassword });
            console.log(res)
      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> "
        );
        // console.log(res.data);
        // save user and token to local storage
        
        // save user and token to redux
        
        toast("password Change Sucessfully")
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
      
    }
    }


    
  return (
    <>
    <MetaData title="Change Password" />
      <div className='login-container'>
        <div className="middle-part">
            <div className="login-logo">
                <img src={logo} alt="" />
            </div>
            <div className="login-form">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username'/>
                <input type="text" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Enter Old Password'/>
                <input type="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password'/>
                <button className='login-button' onClick={handleLogin} disabled={!oldPassword || !newPassword}>Submit</button>
            </div>
            {/* <h3 className='password-change' onClick={handleChangePassword}>Login</h3> */}
        </div>
      </div>
    </>
  )
}

export default ChangePassword