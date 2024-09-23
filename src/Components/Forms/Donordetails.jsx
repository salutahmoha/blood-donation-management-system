import React, { useState } from 'react';
import './css/Donordetails.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from "react-icons/bs";

const Donordetails = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    Fullname: '',
    Email: '',
    Password_hash: '',
    Gender: '',
    Mobilenumber: '',
    Blood_group: '',
    State: '',
    City: '',
    Home_address: '',
    Last_time_donated: '',
    Did_you_ever_donated: '',
    Are_you_on_medication: '',
    Do_you_have_disease: '',
    Role: 'Donor',
  });

  const [fullnameErrorMessage, setFullnameErrorMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Fullname') {
      if (value.length < 4 || value.length > 32) {
        setFullnameErrorMessage('Your fullname should be 4-32 characters/letters');
      } else {
        setFullnameErrorMessage('');
      }
    }

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (fullnameErrorMessage) {
      alert("Please fix the errors in the form before submitting.");
      return;
    }

    axios.post('http://localhost:3001/blood-donation', values)
      .then(res => {
        console.log("Registered successfully!!!");
        setValues({
          Fullname: '',
          Email: '',
          Password_hash: '',
          Gender: '',
          Mobilenumber: '',
          Blood_group: '',
          State: '',
          City: '',
          Home_address: '',
          Last_time_donated: '',
          Did_you_ever_donated: '',
          Are_you_on_medication: '',
          Do_you_have_disease: '',
        
        });
        alert("Registered successfully");

        navigate('/SignIn');
      })
      .catch(err => {
        console.log(err);
        alert("Error occurred. Data not saved to the database.");
      });
  };

  return (
    <section>
      <div className="container" id='Donordetails'>
        <div className="row">
          <div className="col-12 col-lg-12">
            <form onSubmit={handleSubmit}>
              <label htmlFor="exampleFormControlInput1" className="form-label">Fullname*</label>
              <input
                type="name"
                className={`form-control ${fullnameErrorMessage ? 'border-red' : ''}`}
                name="Fullname"
                onChange={handleChange}
                value={values.Fullname}
                placeholder=""
                required
              />
              {fullnameErrorMessage && <div className="error-message">{fullnameErrorMessage}</div>}

              <label htmlFor="exampleFormControlInput1" className="form-label">Gender*</label><br />
              <select name="Gender" onChange={handleChange} value={values.Gender} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> 

              <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
              <input type="email" className="form-control" onChange={handleChange} name="Email" value={values.Email} placeholder="" required/> 

              <label htmlFor="exampleFormControlInput1" className="form-label">Password*</label>
              <input type="password" className="form-control" onChange={handleChange} name="Password_hash" value={values.Password_hash} placeholder="" required/> 
              
              <label htmlFor="exampleFormControlInput1" className="form-label">Mobilenumber*</label>
              <input type="number" className="form-control" onChange={handleChange} name="Mobilenumber" value={values.Mobilenumber} placeholder="" required/>

              <label htmlFor="exampleFormControlInput1" className="form-label">Blood group*</label>
              <select name="Blood_group" onChange={handleChange} value={values.Blood_group}>
                <option value="">Select</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="AB">AB</option>
                <option value="O">O</option>
              </select>

              <label htmlFor="exampleFormControlInput1" className="form-label">State/Country*</label>
              <input type="varchar" className="form-control" onChange={handleChange} name="State" value={values.State} placeholder="" required/>

              <label htmlFor="exampleFormControlInput1" className="form-label">City/County*</label>
              <input type="text" className="form-control" onChange={handleChange} name="City" value={values.City} placeholder="" required/>  

              <label htmlFor="exampleFormControlInput1" className="form-label">Home address/Location*</label>
              <input type="varchar" className="form-control" onChange={handleChange} name="Home_address" value={values.Home_address} placeholder="" required/>

              <label htmlFor="exampleFormControlInput1" className="form-label">Last time blood donated*</label>
              <input type="date" className="form-control" onChange={handleChange} name="Last_time_donated" value={values.Last_time_donated} placeholder="" required/>

              <label htmlFor="exampleFormControlInput1" className="form-label">Did you ever donate blood before*</label>
              <select name="Did_you_ever_donated" onChange={handleChange} value={values.Did_you_ever_donated} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <label htmlFor="exampleFormControlInput1" className="form-label">Are you currently taking any medications*</label>
              <textarea className="form-control" name="Are_you_on_medication" onChange={handleChange} value={values.Are_you_on_medication} rows="6" required></textarea>

              <label htmlFor="exampleFormControlInput1" className="form-label">Do you have any disease*</label>
              <textarea className="form-control" name="Do_you_have_disease" onChange={handleChange} value={values.Do_you_have_disease} rows="6" required></textarea> <br />

              <button type="submit" className="btn2 btn-success">Register</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container" id='Contact'>
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

export default Donordetails;
