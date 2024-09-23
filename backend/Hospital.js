const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createTokens } = require('./JWT');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blood-donation'
});

app.post('/hospital', async (req, res) => {
  const { Email, Password } = req.body;
  const sql = "SELECT * FROM hospital WHERE LOWER(Email) = LOWER(?)";

  try {
    db.query(sql, [Email], async (err, data) => {
      if (err) {
        console.error('Error executing the query:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }

      if (data.length === 0) {
        return res.status(404).json("User does not exist!");
      }

      if (data[0].Password_hash) {
        const match = await bcrypt.compare(Password, data[0].Password_hash);

        if (match) {
          const { Password_hash, ...other } = data[0];

          const token = jwt.sign({ id: data[0].id }, "jwtkey");
          res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .json(other);
        } else {
          return res.status(404).json("Incorrect password!");
        }
      } else {
        return res.status(404).json("Invalid credentials!");
      }
    });
  } catch (error) {
    console.error('Unhandled error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/logout', (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("Logout");
})


app.listen(3004, () => {
  console.log("Listening...");
});
