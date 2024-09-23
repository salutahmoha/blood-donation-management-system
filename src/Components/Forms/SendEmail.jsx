import React, { useState } from 'react';
import axios from 'axios';
import './css/SendEmail.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BsGithub, BsTwitter, BsInstagram, BsFacebook } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { AiOutlineSend } from "react-icons/ai";

const SendEmail = () => {
    const [homeAddress, setHomeAddress] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [attachment, setAttachment] = useState(null);

    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            if (homeAddress === "") {
                alert("please fill out the form")
                return
            }
            const response = await axios.post('http://localhost:3009/donor_details', {
                Home_address: homeAddress,
            });
    
            const searchResultsData = response.data;
    
            if (searchResultsData.length === 0) {
                alert("No donors in " + homeAddress);
                setHomeAddress('');
                setSearchResults([]); // Clear search results
                setSelectedRows([]); // Clear selected rows
            } else {
                setSearchResults(searchResultsData);
                setSelectedRows([]);
    
                // Update the number of available donors in the input field
                document.querySelector('.available-results span').value = searchResultsData.length;
            }
        } catch (error) {
            console.error('Error searching for donors:', error);
        }
    };
    

    const toggleRowSelection = (index) => {
        let newSelectedRows;
        if (index === -1) {
            newSelectedRows = selectedRows.length === searchResults.length ? [] : searchResults.map((_, i) => i);
        } else {
            newSelectedRows = selectedRows.includes(index) ?
                selectedRows.filter((rowIndex) => rowIndex !== index) :
                [...selectedRows, index];
        }
    
        setSelectedRows(newSelectedRows);
    
        document.querySelector('.selected-results').value = newSelectedRows.length;
    }; 
    

    const deleteSelectedRows = async () => {
        try {
            const identifiersToDelete = selectedRows.map((index) => searchResults[index].id);
            await axios.post('http://localhost:3009/delete_donors', { ids: identifiersToDelete });

            const newSearchResults = searchResults.filter((_, index) => !selectedRows.includes(index));
            setSearchResults(newSearchResults);
            setSelectedRows([]);
        } catch (error) {
            console.error('Error deleting selected rows:', error);
        }
    };

    const handleSendEmail = async (e) => {
        e.preventDefault();
    
        const { from, subject, message } = e.target.elements;
    
        const recipients = searchResults
            .filter((result, index) => selectedRows.includes(index))
            .map(result => result.Email);
    
        if (recipients.length === 0) {
            alert("Please select at least one recipient.");
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('from', from.value);
            formData.append('subject', subject.value);
            formData.append('message', message.value);
            recipients.forEach(email => formData.append('recipients[]', email));
            if (attachment) {
                formData.append('attachment', attachment); // Append the attachment
            }
    
            const response = await axios.post('http://localhost:3009/send_email', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data); 
            alert("Email sent successfully.");

            from.value = '';
            subject.value = '';
            message.value = '';
            setAttachment(null);
            setSelectedRows([]);
        } catch (error) {
            console.error('Error sending email:', error);
            alert("Failed to send email. Please try again later.");
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
            <div className="container" id="SendEmail">
                <div className="row">
                    <div className="forms">
                        <div className="col-12 col-lg-3">
                            <div className="form1">
                                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                    <div className="search">
                                        <div className="search-input">
                                            <h2>Contact donors</h2>
                                            <h5>Search by location</h5>
                                            <input type="varchar" className="form-control" required name="Home_address" onChange={(e) => setHomeAddress(e.target.value)} value={homeAddress} placeholder='Enter location'/>
                                        </div>
                                        <button type="button" className="btnSearch btn-success" onClick={handleSearch}>Search</button>
                                        <div className="donors-count">
                                            <div className="available">
                                                <p>Available donors</p>
                                                <div className="available-results">
                                                <span className="placeholder-white">{searchResults.length}</span>
                                                </div>
                                            </div>
                                            <div className="selected">
                                                <p>Selected <br />donors</p>
                                                <div className="selected-results">
                                                <span className="placeholder-white">{selectedRows.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="form2">
                                <form onSubmit={handleSendEmail}>
                                    <div className="email=form1">
                                        <h5>Send Email</h5>
                                        <div className="email-form">
                                            <input type="text" id="from" name="from" required placeholder='Email subject'/>
                                        </div>
                                        <div className="email-form">
                                            <input type="text" id="subject" name="subject" required placeholder='Cc'/>
                                        </div>
                                        <div className="attach-files" >
                                            <p>Attach files</p>
                                            <input type="file" placeholder='Attach files' onChange={(e) => setAttachment(e.target.files[0])} />
                                        </div>
                                    </div>
                                    <div className="email=form1">
                                        <div className="form3">
                                            <div className="email-form">
                                                <textarea id="message" name="message" required placeholder='Message'/>
                                            </div>
                                            <button type="submit" className="btnSendEmail btn-primary">Send    <AiOutlineSend /></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                
            </div>
            </div>
            <div className="search-results" style={{ maxHeight: '300px', overflowX: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox" style={{border: '1px solid black'}} >
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
}

export default SendEmail;
