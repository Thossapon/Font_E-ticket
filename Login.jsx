import React from 'react'
import './Login.css'
import '../../App.css'
import { Link } from 'react-router-dom'
import { FaUserShield } from 'react-icons/fa'
import { BsFillShieldLockFill } from 'react-icons/bs'
import { AiOutlineSwapRight } from 'react-icons/ai'
//import assets
import video from '../../LoginAssets/VideoBG02.mp4'
import logo from '../../LoginAssets/OAG Logo-01.png'


/*
const Login = () => {
  return (
    <div>
      <a href="/register">To Register</a>
      <br />
      <a href="/dashboard">To Dashboard</a>
      <br />
      This is Login Page
    </div>
  )
}
*/
const Login = () => {
  return (

    <div className='loginPage flex'>
      <div className='container flex'>
      

      <div className="videoDiv">
        <video src={video} autoPlay muted loop></video>

        <div className="textDiv">
        <h2 className="title">OAG</h2>
        <p>E-Ticket</p>
        </div>

        <div className="footerDiv flex"> 
        <span className="text">
          สมัครใหม่</span>
        <Link to={'/register'}>
        <button className='btn'>Sign Up</button>
        </Link>
        </div>
      </div>
      
      { <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="Logo Image" />
          <h3>Welcome Back!</h3>
        </div>
        <form action="" className='form grid'>
          <span className='showMessage'>Login Status will go here</span>
          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className='icon'/>
              <input type="text" id='username' placeholder='Enter Username'/>
            </div>
          </div> 

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <BsFillShieldLockFill className='icon' />
              <input type="password" id='password' placeholder='Enter Password'/>
            </div>
          </div> 
          
          <button type='submit' className='btn flex'>
          <span>Login</span>
          <AiOutlineSwapRight className='icon' />
          </button>

          <span className ='forgotPassword'>
            Forgot your password?<a href="">Click Here</a>
          </span>
          <div className="footerDiv flex"> 
            <span className ='forgotPassword'>
            <a href="/navbar">navbar</a>TTTTTTTTTTTTTTT
              <a href="/dashboard">To Dashboard</a>
            </span>
        </div>

        </form>
      </div> }



      </div>
 
    
    </div>
  )
}

export default Login

