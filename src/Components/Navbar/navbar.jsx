import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

import "./navbar.css";
import logo from '../Assets/logo (1).jpg'

import { BsIndent } from "react-icons/bs";
import { HamburgetMenuClose, HamburgetMenuOpen } from './Icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { AuthContext } from "../Forms/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { BsPersonFill } from "react-icons/bs";
function NavBar() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [text, setText] = useState('')
 const navigate = useNavigate();
  const {logout}  = useContext(AuthContext);
  const  {currentUser} = React.useContext(AuthContext);

  useEffect(() => {
      if (currentUser !== null) {
        if (currentUser.Role === "Donor") {
          setText(currentUser.Fullname)
        } 

        if (currentUser.Role === "Hospital") {
          setText(currentUser.Hospitalname)
        }

        if (currentUser.Role === "Company") {
          setText(currentUser.Companyname)
        }
        setLoggedIn(true);
        
  } else {
    setText("Username")
  }
  });

  const navigate1 = useNavigate();
  const handleDonateNowClick1 = () => {
    handleClick();
    navigate1('/Hospital');
  };

  const navigate2 = useNavigate();
  const handleDonateNowClick2 = () => {
    navigate2(loggedIn ? '/UserPrivilege' : '/SignIn');
    handleClick();
  };

  const navigate3 = useNavigate();
  const handleDonateNowClick3 = () => {
    navigate3('/Company');
    handleClick();
  };

  const navigate4 = useNavigate();
  const handleDonateNowClick4 = () => {
    navigate2(currentUser !== null ? '/UserPrivilege' : '/SignIn');
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };
  const handleLogout = () => {
    logout();
    navigate('/SignIn');
  };
  const handleClick1 = () => {
    setClick(false);
  };

  const handleClick = () => setClick(!click);

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>
              <img src={logo} alt="" className="navbar-img" />
            </span>
          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
                onClick1={handleClick1}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="About"
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={80}
                className="nav-links"
                onClick={handleClick}
                onClick1={handleClick1}
              >
                About Us
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="Process"
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={80}
                className="nav-links"
                onClick={handleClick}
                onClick1={handleClick1}
              >
                Process
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="Blog"
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={80}
                className="nav-links"
                onClick={handleClick}
                onClick1={handleClick1}
              >
                Blog
              </ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink
                to="Contact"
                smooth={true}
                duration={500}
                spy={true}
                exact='true'
                offset={80}
                className="nav-links"
                onClick={handleClick}
                onClick1={handleClick1}
              >
                Contact Us
              </ScrollLink>
            </li>
            
            <li className="nav-item">
              {loggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn2 btn-success dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                   <BsPersonFill size={30} className="personfill"/>{text}
                  </button>
                  <ul className="dropdown-menu">
                  <li>
                      <button
                        type="button"
                        className=" btn-success dropdown-item"
                        onClick={handleDonateNowClick4}
                      >
                        Change Information
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="btn4 btn-success dropdown-item"
                        onClick={() => {
                          handleLogout();
                          handleClick();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn2 btn-success"
                    onClick={() => {
                      handleDonateNowClick2();
                      handleLogin();
                    }}
                  >
                    <BsPersonFill size={30} className="personfill"/> Username
                  </button>
                </li>
              )}
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
