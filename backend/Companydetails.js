const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const cors = require('cors');

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

app.post('/blood-donation', async (req, res) => {
  const checkEmailSql = "SELECT COUNT(*) as count FROM company WHERE Email = ?";
  const emailExists = await new Promise((resolve, reject) => {
    db.query(checkEmailSql, [req.body.Email], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0].count > 0);
      }
    });
  });

  if (emailExists) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(req.body.Password_hash, 10);

  const insertSql = "INSERT INTO company (Companyname, Email, Password_hash, Contact_number, Location, Role) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.Companyname,
    req.body.Email,
    hashedPassword,
    req.body.Contact_number,
    req.body.Location,
    req.body.Role
  ];

  db.query(insertSql, values, (err, data) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ error: err.message });
    }
    return res.json(data);
  });
});

app.listen(3007, () => {
  console.log("Listening...");
});
