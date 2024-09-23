// Hospital.jsx
import React, { useState, useContext } from 'react';
import './css/Hospital.css';
import axios from 'axios';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook, BsPerson } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth.js';

const Hospital = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMsgUser, setErrMsgUser] = useState('');
  const [errorMsgPass, setErrMsgPass] = useState('');

  axios.defaults.withCredentials = true;

  const { hospitalSignIn } = useContext(AuthContext);

  const navigate1 = useNavigate();
  const  {currentUser} = React.useContext(AuthContext);

  const handlehospitaSign = async (event) => {
    event.preventDefault();

    try {
      const res  = await hospitalSignIn(Email, Password);       
       navigate('/Hospitalprivilege');     
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

  const handleDonateNowClick1 = () => {
    navigate1('/Hospitaldetails');
  };

  return (
    <section>
      <div className="container" id="Admin">
        <div className="row">
          <div className="Admin-icon">
            <BsPerson size={150} />
          </div>

          <h3>Hospital Login</h3> <br />
          <form onSubmit={handlehospitaSign}>
            <label htmlFor="Email" className="form-label">Email*</label>
            <input
              type="email"
              className="form-control"
              id="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <p style={{color: "red" }}>{errorMsgUser}</p>
            <label htmlFor="Password" className="form-label">Password*</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <p style={{color: "red" }}>{errorMsgPass}</p>
            <button type="submit" className="btnAdmin btn-success">Login</button> <br />

            <div className="SignIn-info">
              <p>Don't have an account?</p>
              <button type="button" className="btn2 btn-success" onClick={handleDonateNowClick1}>
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

export default Hospital;
