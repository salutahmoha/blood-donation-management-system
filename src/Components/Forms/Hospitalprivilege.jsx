import React, { useState, useEffect } from 'react';
import './css/Hospitalprivilege.css';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Hospitalprivilege = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [bloodGroupError, setBloodGroupError] = useState('');
  const [homeAddressError, setHomeAddressError] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    setBloodGroupError('');
    setHomeAddressError('');

    if (!bloodGroup) {
      setBloodGroupError(true);
      return; // Exit the function early
    }

    if (!homeAddress) {
      setHomeAddressError(true);
      return; // Exit the function early
    }
    
    try {
      const response = await axios.post('http://localhost:3005/donor_details', {
        Blood_group: bloodGroup,
        Home_address: homeAddress,
      });
  
      const searchResultsData = response.data;
  
      if (searchResultsData.length === 0) {
        alert("No such result");
        setSearchResults([]); // Clear search results
        setSelectedRows([]); // Clear selected rows
      } else {
        setSearchResults(searchResultsData);
        setSelectedRows([]);
      }
    } catch (error) {
      console.error('Error searching for donors:', error);
    }
  };  

  const toggleRowSelection = (index) => {
    const selectedRowIndex = selectedRows.indexOf(index);
    let newSelectedRows = [...selectedRows];

    if (selectedRowIndex === -1) {
      newSelectedRows.push(index);
    } else {
      newSelectedRows.splice(selectedRowIndex, 1);
    }

    setSelectedRows(newSelectedRows);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === searchResults.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(Array.from({ length: searchResults.length }, (_, index) => index));
    }
  };

  const deleteSelectedRows = async () => {
    try {
      const identifiersToDelete = selectedRows.map((index) => searchResults[index].id);
      await axios.post('http://localhost:3005/delete_donors', { ids: identifiersToDelete });

      const newSearchResults = searchResults.filter((_, index) => !selectedRows.includes(index));
      setSearchResults(newSearchResults);
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting selected rows:', error);
    }
  };

  const columns = [
    'Fullname',
    'Gender',
    'Email',
    'Mobilenumber',
    'Blood_group',
    'State',
    'City',
    'Home_address',
    'Last_time_donated',
    'Did_you_ever_donated',
    'Are_you_on_medication',
    'Do_you_have_disease',
  ];

  const columns2 = [
    'Name',
    'Gender',
    'Email',
    'Phone',
    'B Group',
    'State',
    'City',
    'Address',
    'Last donation',
    'Ever donated?',
    'On medication?',
    'Disease?',
    'Actions'
];
  return (
    <section>
      <div className="container" id="Adminprivilege">
        <div className="row">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <div className="search">
              <div className="search-input">
                <label htmlFor="exampleFormControlInput1" className="form-label">Blood group*</label> <br />
                <select name="Blood_group" className="select-field" onChange={(e) => {
                    setBloodGroup(e.target.value);
                    setBloodGroupError(false);
                  }} required >
                  <option value="">Select</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select><br />
              {bloodGroupError && <span className="error-message">Please select the blood type.</span>}
              </div>

              <div className="search-input">
                <label htmlFor="exampleFormControlInput1" className="form-label">Home address/Location*</label>
                <input type="varchar" className="form-control" name="Home_address" onChange={(e) => {setHomeAddress(e.target.value);setHomeAddressError(false);}}  placeholder="" required/>
                {homeAddressError && <span className="error-message">Please fill the location.</span>}
              </div>
            </div>
            <button type="button" className="btnSearch btn-success" onClick={handleSearch}>Search</button>

          </form>

          <div className="search-results" style={{ maxHeight: '300px', overflowY: 'auto',  }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" >
                                    <input type="checkbox" checked={selectedRows.length === searchResults.length} onChange={() => toggleRowSelection(-1)} />
                                </TableCell>
                                {columns2.map((column) => (
                                    <TableCell key={column} className='column-header'>{column}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map((result, index) => (
                                <TableRow key={index} selected={selectedRows.includes(index)} onClick={() => toggleRowSelection(index)}>
                                    <TableCell padding="checkbox">
                                        <input type="checkbox" checked={selectedRows.includes(index)} onChange={() => { }} />
                                    </TableCell>
                                    {columns.map((column) => (
                                        <TableCell key={column}>{result[column]}</TableCell>
                                    ))}
                                    <TableCell>
                                        <button type="button" className="btnDelete btn-danger" onClick={deleteSelectedRows}>Delete</button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>  
            </div>
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

export default Hospitalprivilege;
