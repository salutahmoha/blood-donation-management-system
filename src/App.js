import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/navbar';

import Home from './Components/Pages/Home';
import About from './Components/Pages/About';
import Process from './Components/Pages/Process';
import Blog from './Components/Pages/Blog';
import Contact from './Components/Pages/Contact';
import Donordetails from './Components/Forms/Donordetails';
import Hospitaldetails from './Components/Forms/Hospitaldetails';
import SignIn from './Components/Forms/SignIn';
import Hospital from './Components/Forms/Hospital';
import Hospitalprivilege from './Components/Forms/Hospitalprivilege';
import Userprivilege from './Components/Forms/Userprivilege';
import Company from './Components/Forms/Company';
import Companydetails from './Components/Forms/Companydetails';
import SendEmail from './Components/Forms/SendEmail';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/About" element={<About Us/>}/>
        <Route path="/Process" element={<Process/>}/>
        <Route path="/Blog" element={<Blog/>}/>
        <Route path="/Contact" element={<Contact Us/>}/>
        <Route path="/Donordetails" element={<Donordetails/>} />
        <Route path="/Hospitaldetails" element={<Hospitaldetails/>} />
        <Route path="/SignIn" element={<SignIn/>} />
        <Route path="/Hospital" element={<Hospital/>} />
        <Route path="/Hospitalprivilege" element={<Hospitalprivilege/>} />
        <Route path="/Userprivilege" element={<Userprivilege/>} />
        <Route path="/Company" element={<Company/>} />
        <Route path="/Companydetails" element={<Companydetails/>} />
        <Route path="/SendEmail" element={<SendEmail/>} />
      </Routes>
    </div>
  );
}

export default App;
