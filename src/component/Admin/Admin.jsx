import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import logo from '../../assests/TST logo.svg'
import './login.css'
import MetaData from "../../MetaData";
import { login } from '../../action/auth'
import { useDispatch, useSelector } from 'react-redux';

function Admin({history}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const { auth } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();

    const handleLogin = async() =>{
      
    console.log("SEND LOGIN DATA", { username, password });
    try {
      let res = await login({ username, password });
            console.log(res)
      if (res.data) {
        console.log(
          "SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> "
        );
        // console.log(res.data);
        // save user and token to local storage
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        // save user and token to redux
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
    }

    
    const handleLogoClick = () => {
        history.push("/");
      }

    const handleChangePassword = () => {
      history.push("/changepassword");
    }
    
  return (
    <>
    <MetaData title="Login" />
      <div className='login-container'>
        <div className="middle-part">
            <div className="login-logo" onClick={handleLogoClick}>
                <img src={logo} alt="" />
            </div>
            <div className="login-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Enter Username'/>
                <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password'/>
                <button className='login-button' onClick={handleLogin} disabled={!username || !password}>Submit</button>
            </div>
            <h3 className='password-change' onClick={handleChangePassword}>Change Password?</h3>
        </div>
    </div>
    </>
  )
}

export default Admin