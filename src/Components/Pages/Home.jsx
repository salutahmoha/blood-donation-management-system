import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

import about from '../Assets/about (1).jpg';
import g1 from '../Assets/g1.jpg';
import g2 from '../Assets/g2.jpg';
import g3 from '../Assets/g3.jpg';
import g4 from '../Assets/g4.jpg';

import blog1 from '../Assets/blog_01.jpg';
import blog2 from '../Assets/blog_02.jpg';
import blog3 from '../Assets/blog_03.jpg';
import blog4 from '../Assets/blog_04.jpg';

import { BsArrowRightShort } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";

import { BsPersonFill, BsCSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { BiHeading } from "react-icons/bi";
import { BiMale } from "react-icons/bi";
import { FaFemale } from "react-icons/fa";
const Home = () => {
  const navigate = useNavigate();

  const handleDonateNowClick1 = () => {
    navigate('/SignIn');
  };

  const handleDonateNowClick2 = () => {
    navigate('/Hospital');
  };

  const handleDonateNowClick3 = () => {
    navigate('/Company');
  };

  const [totalDonors, setTotalDonors] = useState(0);
  const [totalHospitals, setTotalHospitals] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);

  const [maleDonors, setMaleDonors] = useState(0);
  const [femaleDonors, setFemaleDonors] = useState(0);

  const [countBloodGroupA, setCountBloodGroupA] = useState(0);
  const [countBloodGroupB, setCountBloodGroupB] = useState(0);
  const [countBloodGroupO, setCountBloodGroupO] = useState(0);
  const [countBloodGroupAB, setCountBloodGroupAB] = useState(0);

  useEffect(() => {
    const fetchTotalDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/totalRegisteredDonors');
        setTotalDonors(response.data.totalDonors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalDonors();
  }, []);

  useEffect(() => {
    const fetchTotalHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3001/totalRegisteredHospitals');
        setTotalHospitals(response.data.totalHospitals);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalHospitals();
  }, []);

  useEffect(() => {
    const fetchTotalCompany = async () => {
      try {
        const response = await axios.get('http://localhost:3001/totalRegisteredCompany');
        setTotalCompany(response.data.totalCompany);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTotalCompany();
  }, []);

  useEffect(() => {
    // Fetch male donor count
    const fetchMaleDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/maleDonors');
        setMaleDonors(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch female donor count
    const fetchFemaleDonors = async () => {
      try {
        const response = await axios.get('http://localhost:3001/femaleDonors');
        setFemaleDonors(response.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMaleDonors();
    fetchFemaleDonors();
  }, []);

  useEffect(() => {
    // Fetch counts of donors for each blood group
    const fetchBloodGroupCounts = async () => {
      try {
        const responseA = await axios.get('http://localhost:3001/donorsBloodGroupA');
        setCountBloodGroupA(responseA.data.count);
        
        const responseB = await axios.get('http://localhost:3001/donorsBloodGroupB');
        setCountBloodGroupB(responseB.data.count);
        
        const responseO = await axios.get('http://localhost:3001/donorsBloodGroupO');
        setCountBloodGroupO(responseO.data.count);
        
        const responseAB = await axios.get('http://localhost:3001/donorsBloodGroupAB');
        setCountBloodGroupAB(responseAB.data.count);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBloodGroupCounts();
  }, []);

  return (
    <section>

      <div className='container' id='home'>
        <div className="row">
          <div className="col-12 col-lg-5">
            <h2>Donate Blood & Save a Life</h2>
            <p>Blood Donor day is celebrated on 14th June to create awareness of the universal need for blood for health care and also celebrate and think every individual who donates blood and encourage more
              people to start donating.</p>
            <div className="home-btn">
              <button onClick={handleDonateNowClick1}>Donor</button>
              <button onClick={handleDonateNowClick2}>Hospital</button>
              <button onClick={handleDonateNowClick3}>Company</button>
            </div>
          </div>
          <div className="col-12 col-lg-7">
            <div className="dashboard">
              <div className="reports">
                <div className="donor-report">
                  <div className="registered-donor">
                    <span className="placeholder-white">{totalDonors}</span>
                    <h6>Donors</h6>
                  </div>
                  <div className="icon2">
                    <BsPersonFill size={40} />
                  </div>
                </div>
                <div className="info" onClick={handleDonateNowClick1}>
                  <h6>More Info</h6>
                  <button type="button" className="btn5 btn-success" >
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
              </div>
              <div className="reports">
                <div className="hospital-report">
                  <div className="registered-donor">
                    <span className="placeholder-white">{totalHospitals}</span>
                    <h6>Hospitals</h6>
                  </div>
                  <div className="icon2">
                    <BiHeading size={30} />
                  </div>
                </div>
                <div className="info" onClick={handleDonateNowClick2}>
                  <h6>More Info</h6>
                  <button type="button" className="btn5 btn-success">
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
              </div>
              <div className="reports">
                <div className="company-report">
                  <div className="registered-donor">
                    <span className="placeholder-white">{totalCompany}</span>
                    <h6>Companies</h6>
                  </div>
                  <div className="icon2">
                    <BsCSquareFill size={30} />
                  </div>
                </div>
                <div className="info" onClick={handleDonateNowClick3}>
                  <h6>More Info</h6>
                  <button type="button" className="btn5 btn-success">
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
              </div>
            </div>

            <div className="gender-dashboard">
              <div className="gender">
                <div className="gender-donors">
                  <div className="each-gender">
                    <span className="placeholder-white">{maleDonors}</span>
                    <h6>Male donors</h6>
                  </div>
                  <div className="icon3">
                    <BiMale size={30} />
                  </div>
                </div>
                <div className="info">
                  <h6>More Info</h6>
                  <button type="button" className="btn5 btn-success" onClick={handleDonateNowClick1}>
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
              </div>
              <div className="gender">
                <div className="gender-donors">
                  <div className="each-gender">
                    <span className="placeholder-white">{femaleDonors}</span>
                    <h6>Female donors</h6>
                  </div>
                  <div className="icon3">
                    <FaFemale size={30} />
                  </div>
                </div>
                <div className="info">
                  <h6>More Info</h6>
                  <button type="button" className="btn5 btn-success" onClick={handleDonateNowClick1}>
                    <IoArrowForwardCircleOutline />
                  </button>
                </div>
              </div>
            </div>

            <div className="blood-results">
              <h4>Blood group numbers(Donors)</h4>
              <div className="blood-type">

                <div className="blood-div">
                  <h6>Blood group: A</h6>
                  <div className="blood-result">
                    <span className="placeholder-white">{countBloodGroupA}</span>
                    <div className="blood-group">
                      <h5>A</h5>
                    </div>
                  </div>
                </div>

                <div className="blood-div">
                  <h6>Blood group: B</h6>
                  <div className="blood-result">
                    <span className="placeholder-white">{countBloodGroupB}</span>
                    <div className="blood-group">
                      <h5>B</h5>
                    </div>
                  </div>
                </div>

                <div className="blood-div">
                  <h6>Blood group: O</h6>
                  <div className="blood-result">
                    <span className="placeholder-white">{countBloodGroupO}</span>
                    <div className="blood-group">
                      <h5>O</h5>
                    </div>
                  </div>
                </div>

                <div className="blood-div">
                  <h6>Blood group: AB</h6>
                  <div className="blood-result">
                    <span className="placeholder-white">{countBloodGroupAB}</span>
                    <div className="blood-group">
                      <h5>AB</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id='About'>
        <div className="row">
          <h3>About Us</h3>
          <p className='container-text'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has
          </p>

          <div className="col-12 col-lg-6" >
            <h4>About Us Donors</h4>

            <div className="about-text">
              <p>Blood donation is a vital aspect of healthcare systems around the world,
                providing a critical resource for emergency situations, medical procedures, and
                ongoing treatment for a variety of conditions. Blood donors are individuals
                who volunteer to donate blood, either for general use or for specific individuals
                who require transfusions. <br /><br />
                The content related to blood donors may include information about the
                importance of blood donation, how blood is collected and processed, the
                benefits and risks of donating blood, and the eligibility criteria for blood
                donors. This content may also cover topics such as the different blood types and
                their compatibility, the use of blood in medical treatments, and the role of
                blood banks and transfusion centers in managing blood supplies. <br /><br />
                In addition to educational content, resources for blood donors may also include
                tools for finding local blood drives or donation centers, information on how to
                prepare for a blood donation, and resources for tracking blood donations and
                managing donor profiles. Other content related to blood donation may focus on
                raising awareness about the need for blood donors and encouraging individuals
                to consider donating blood to support their communities and healthcare
                systems. <br />

              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6" >
            <img src={about} alt="" className='img-fluid' />
          </div>
        </div>
      </div>

      <div className="container" id='Process'>
        <div className="row">
          <h3>Donation Process</h3>
          <p className='container-text'>The donation process from the time you arrive center until the time you leave</p>

          <div className="col-12  col-lg-3 col-md-6">
            <div className="process-div">
              <img src={g1} alt="" />
              <h6>1 - Registration and Screening:</h6>
              <p>The donor fills out a registration form and undergoes a brief medical
                screening to ensure that they are eligible to donate blood. This may
                include checking the donor's blood pressure, pulse, and hemoglobin levels,
                as well as asking about their medical history and recent travel.</p>

              <button type="button" className="btn btn-success">Readmore <BsArrowRightShort /></button>
            </div>
          </div>

          <div className="col-12  col-lg-3 col-md-6">
            <div className="process-div">
              <img src={g2} alt="" />
              <h6>2 - Donation</h6>
              <p>Once the donor is cleared to donate, they are escorted to a donation area
                where a sterile needle is inserted into a vein in their arm. The donation
                process typically takes between 10 and 20 minutes, during which time the
                donor's blood is collected in a sterile bag.</p>

              <button type="button" className="btn btn-success">Readmore <BsArrowRightShort /></button>
            </div>
          </div>

          <div className="col-12  col-lg-3 col-md-6">
            <div className="process-div">
              <img src={g3} alt="" />
              <h6>3 - Post-Donation Refreshment:</h6>
              <p>After the donation is complete, the donor is typically asked to rest for a
                few minutes and have a snack or drink to help replenish fluids and
                prevent dizziness or lightheadedness.</p>

              <button type="button" className="btn btn-success">Readmore <BsArrowRightShort /></button>
            </div>
          </div>

          <div className="col-12  col-lg-3 col-md-6">
            <div className="process-div">
              <img src={g4} alt="" />
              <h6>4 - Follow-Up:</h6>
              <p>Donors may be given information about how to monitor their health and
                well-being after the donation, and may be contacted in the future to
                schedule additional donations or to provide feedback on their
                experience.
              </p>

              <button type="button" className="btn btn-success">Readmore <BsArrowRightShort /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id='Blog'>
        <div className="row">
          <h3>Latests Blog</h3>
          <p className='container-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce fringilla vel nisl a
            dictum. Donec ut est arcu. Donec hendrerit velit consectetur adipiscing elit.</p>

          <div className="col-12 col-lg-6">
            <div className="Blog-div">
              <img src={blog1} alt="" />
              <div className="blog-text">
                <h6>Importance:</h6>
                <p>Blood donation saves lives by providing a critical resource for emergency
                  situations and medical treatments.</p>

                <div className="comment">
                  <p>27 Comments / Blog Design / Read More</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="Blog-div">
              <img src={blog2} alt="" />
              <div className="blog-text">
                <h6>Donating blood</h6>
                <p>Donating blood is a safe and simple process that can help support the health
                  and well-being of individuals and communities.</p>
                <div className="comment">
                  <p>27 Comments / Blog Design / Read More</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="Blog-div">
              <img src={blog3} alt="" />
              <div className="blog-text">
                <h6>eligibility criteriae</h6>
                <p>Anyone who meets the eligibility criteria can donate blood, and the process
                  is strictly regulated to ensure the safety of donors and recipients alike.</p>

                <div className="comment">
                  <p>27 Comments / Blog Design / Read More</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="Blog-div">
              <img src={blog4} alt="" />
              <div className="blog-text">
                <h6>Latest News</h6>
                <p>Blood donations are needed on a regular basis to ensure a sufficient supply of
                  blood for patients in need, especially during times of crisis or high demand.</p>
                <div className="comment">
                  <p>27 Comments / Blog Design / Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id='Contact'>
        <div className="row">
          <div className="horizontal-line">

          </div>
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
  )
}

export default Home;
