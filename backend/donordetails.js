
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');  // Add this line to require bcrypt

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
  }));
  
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blood-donation'
});

//fetch total registered donors
app.get('/totalRegisteredDonors', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalDonors FROM donor_details";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const totalDonors = result[0].totalDonors;
        res.json({ totalDonors });
    });
});

//fetch total registered hospitals
app.get('/totalRegisteredHospitals', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalHospitals FROM hospital";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const totalHospitals = result[0].totalHospitals;
        res.json({ totalHospitals });
    });
});

//fetch total registered Company
app.get('/totalRegisteredCompany', (req, res) => {
    const sql = "SELECT COUNT(*) AS totalCompany FROM company";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const totalCompany = result[0].totalCompany;
        res.json({ totalCompany });
    });
});

// Fetch total registered male donors
app.get('/maleDonors', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Gender = 'Male'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

// Fetch total registered female donors
app.get('/femaleDonors', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Gender = 'Female'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

// Fetch count of donors for blood group A
app.get('/donorsBloodGroupA', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Blood_group = 'A'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

// Fetch count of donors for blood group B
app.get('/donorsBloodGroupB', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Blood_group = 'B'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

// Fetch count of donors for blood group O
app.get('/donorsBloodGroupO', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Blood_group = 'O'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

// Fetch count of donors for blood group AB
app.get('/donorsBloodGroupAB', (req, res) => {
    const sql = "SELECT COUNT(*) AS count FROM donor_details WHERE Blood_group = 'AB'";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        const count = result[0].count;
        res.json({ count });
    });
});

app.post('/blood-donation', async (req, res) => {
    const saltRounds = 10;  // Number of salt rounds for bcrypt

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.Password_hash, saltRounds);

        const sql = "INSERT INTO donor_details (`Fullname`,`Email`,`Password_hash`,`Gender`,`Mobilenumber`,`Blood_group`,`State`,`City`,`Home_address`,`Last_time_donated`,`Did_you_ever_donated`,`Are_you_on_medication`,`Do_you_have_disease`,`Role`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.Fullname,
            req.body.Email,
            hashedPassword,  // Use the hashed password here
            req.body.Gender,
            req.body.Mobilenumber,
            req.body.Blood_group,
            req.body.State,
            req.body.City,
            req.body.Home_address,
            req.body.Last_time_donated,
            req.body.Did_you_ever_donated,
            req.body.Are_you_on_medication,
            req.body.Do_you_have_disease,
            req.body.Role,
        ];

        db.query(sql, values, (err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        });
    } catch (error) {
        console.error(error);
        return res.json({ error: 'Error hashing password' });
    }
});


app.listen(3001, () => {
    console.log('Listening......');
});
