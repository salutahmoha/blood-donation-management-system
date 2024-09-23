import React, { useState, useContext } from 'react';
import './css/SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { AuthContext } from './auth.js';

const Company = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [errorMsgUser, setErrMsgUser] = useState('');
  const [errorMsgPass, setErrMsgPass] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const {companySignIn}  = useContext(AuthContext);

  const  {currentUser} = React.useContext(AuthContext);

  const handlecompanySignIn = async (event) => {
    event.preventDefault();
  
    try {
       const res  = await companySignIn(Email, Password);       
        navigate('/sendEmail');     
    } catch (error) {
      if (error.response.data === "User does not exist!") {
        setErrMsgUser(error.response.data);
        setErrMsgPass("")
      } 
      if (error.response.data === "Incorrect password!") {
        setErrMsgPass(error.response.data);
        setErrMsgUser("")
      } 
    
    }
  };
  

  const navigate2 = useNavigate();
  const handleDonateNowClick2 = () => {
    navigate2('/Companydetails');
  };

  return (
    <section>
      <div className="container" id="SignIn">
        <div className="row">
          <div className="SignIn-img">
            <img src="https://www.pngkit.com/png/detail/366-3668517_related-wallpapers-blood-donation-logo-png.png" alt="" />
            <h4>People <span>Live</span> When People <span>Give</span></h4>
          </div>

          <h3>Company Login</h3> <br />
          
          <form onSubmit={handlecompanySignIn}>
            <label htmlFor="Email" className="form-label">
              Email*
            </label>
            <input
              type="email"
              className="form-control"
              name="Email"
              placeholder=""
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{color: "red" }}>{errorMsgUser}</p>
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              type="password"
              className="form-control"
              name="Password_hash"
              placeholder=""
              required
              onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <p style={{color: "red" }}>{errorMsgPass}</p>
            <button type="submit" className="btnSignIn btn-success">
              Login
            </button> <br />

            <div className="SignIn-info">
              <p>Don't have an account?</p>
              <button type="button" className="btn2 btn-success" onClick={handleDonateNowClick2}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="container" id="Contact">
        <div className="row">
          <div className="horizontal-line"></div>
          <div className="Contact-text">
            <div className="Contact-copyright">
              <h5>Copyright &copy; Salad Mohamed | All right reserved.</h5>
            </div>

            <div className="socials">
              <div><BsGithub /></div>
              <div><BsTwitter /></div>
              <div><BsInstagram /></div>
              <div><BsFacebook /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Company;