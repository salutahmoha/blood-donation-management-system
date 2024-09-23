const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const nodemailer = require('nodemailer');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File name with timestamp to avoid overwriting
    }
});

const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blood-donation',
});

app.post('/donor_details', (req, res) => {
    const sql = 'SELECT * FROM donor_details WHERE LOWER(Home_address) = ?';

    db.query(sql, [req.body.Home_address], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.post('/delete_donors', (req, res) => {
    const ids = req.body.ids;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Invalid or missing identifiers for deletion.' });
    }

    const sql = 'DELETE FROM donor_details WHERE id IN (?)';

    db.query(sql, [ids], (err, result) => {
        if (err) return res.json(err);

        return res.json({ message: 'Selected rows deleted successfully.' });
    });
});

// Modified route to handle file upload and send email with attachment
app.post('/send_email', upload.single('attachment'), (req, res) => {
    const { from, subject, message, recipients } = req.body;
    const attachment = req.file; // Get the uploaded file

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'salutahmoha@gmail.com', // Your Gmail email address
            pass: 'cwci uxpj qexb fucp' // Your Gmail password
        }
    });

    const mailOptions = {
        from: from,
        to: recipients.join(','), // Join recipients array into comma-separated string
        subject: subject,
        text: message,
        attachments: attachment ? [{ filename: attachment.originalname, path: attachment.path }] : [] // Attach uploaded file if exists
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email.' });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({ message: 'Email sent successfully.' });
        }
    });
});

app.listen(3009, () => {
    console.log('Listening......');
});
