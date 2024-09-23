import React, { useState, useContext } from 'react';
import './css/Userprivilege.css';
import axios from 'axios';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { AuthContext } from './auth';
import doctor from '../Assets/doctor.jpg';
import doctor1 from '../Assets/doctor1.jpg';


const Userprivilege = ({ location }) => {
    const { currentUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ 
        Fullname: currentUser.Fullname,
        Gender: currentUser.Gender,
        Email: currentUser.Email,
        Mobilenumber: currentUser.Mobilenumber,
        Blood_group: currentUser.Blood_group,
        State: currentUser.State,
        City: currentUser.City,
        Home_address: currentUser.Home_address,
        Occupation: currentUser.Occupation,
        Last_time_donated: currentUser.Last_time_donated,
        Did_you_ever_donated: currentUser.Did_you_ever_donated,
        Are_you_on_medication: currentUser.Are_you_on_medication,
        Do_you_have_disease: currentUser.Do_you_have_disease
    });

    const [loggedIn, setLoggedin] = useState(false);

    if (currentUser === null) {
        setLoggedin(false)
    } 
      

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3006/donor_details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result === 'success') {
                alert('Update successful');
            } else {
                console.log(result);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
            (loggedIn ? (
                <h1>you are not logged in.</h1>
            ) : (
                <div>
                   <div className="container" id='Userprivilege'>
                <div className="row">
                    <div className="text-overlay">
                        <h2><div className="first">Every drop counts </div>donate blood and make a difference</h2>
                    </div>
                </div>
            </div>

            <div className="container" id='profile'>
                <div className="row">
                    <h3>Donor Profile</h3>
                    <div className="col-12 col-lg-6">
                        {/* Conditionally render the image based on Gender */}
                        {formData.Gender === "Male" ? <img src={doctor1} alt="" /> : <img src={doctor} alt="" />}
                    </div>
                    <div className="col-12 col-lg-6 profile-info">
                        <h4>Detail of Your profile</h4>
                        <form onSubmit={handleUpdate}>
                            <label htmlFor="exampleFormControlInput1" className="form-label">Fullname/Username*</label>
                            <input type="name" className="form-control" name="Fullname" value={formData.Fullname} onChange={handleInputChange} placeholder="" required/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Gender*</label>
                            <select name="Gender" required value={formData.Gender} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                            <input type="email" className="form-control" name="Email" placeholder="" required value={formData.Email} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Password*</label>
                            <input type="password" className="form-control" name="Password_hash" placeholder="" required value={formData.Password_hash} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Mobilenumber*</label>
                            <input type="number" className="form-control" name="Mobilenumber" placeholder="" required value={formData.Mobilenumber} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Blood group*</label>
                            <select name="Blood_group" value={formData.Blood_group} onChange={handleInputChange}>
                                <option value="">Select</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="AB">AB</option>
                                <option value="O">O</option>
                            </select><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">State*</label>
                            <input type="varchar" className="form-control" name="State" placeholder="" required value={formData.State} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">City/County*</label>
                            <input type="text" className="form-control" name="City" placeholder="" required value={formData.City} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Home address/Location*</label>
                            <input type="varchar" className="form-control" name="Home_address" placeholder="" required value={formData.Home_address} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Last time blood donated*</label>
                            <input type="date" className="form-control" name="Last_time_donated" placeholder="" required value={formData.Last_time_donated} onChange={handleInputChange}/><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Did you ever donate blood before*</label>
                            <select name="Did_you_ever_donated" required value={formData.Did_you_ever_donated} onChange={handleInputChange}>
                                <option value="">----------</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Are you currently taking any medications*</label>
                            <textarea className="form-control" name="Are_you_on_medication" rows="1" required value={formData.Are_you_on_medication} onChange={handleInputChange}></textarea><br />

                            <label htmlFor="exampleFormControlInput1" className="form-label">Do you have any disease*</label>
                            <textarea className="form-control" name="Do_you_have_disease" rows="1" required value={formData.Do_you_have_disease} onChange={handleInputChange}/> <br />

                            <button type="submit" className="btn2 btn-success">Update</button> <br />
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
                </div>

            ))
    );
};

export default Userprivilege;
