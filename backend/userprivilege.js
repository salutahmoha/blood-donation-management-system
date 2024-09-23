const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blood-donation',
});

app.post('/donor_details', (req, res) => {
  const { Email, Fullname, Gender, Mobilenumber, Blood_group, State, City, Home_address, Last_time_donated, Did_you_ever_donated, Are_you_on_medication, Do_you_have_disease } = req.body;

  const sql = "UPDATE donor_details SET Fullname=?, Gender=?, Mobilenumber=?, Blood_group=?, State=?, City=?, Home_address=?, Last_time_donated=?, Did_you_ever_donated=?, Are_you_on_medication=?, Do_you_have_disease=? WHERE Email=?";

  db.query(
    sql,
    [Fullname, Gender, Mobilenumber, Blood_group, State, City, Home_address, Last_time_donated, Did_you_ever_donated, Are_you_on_medication, Do_you_have_disease, Email],
    (err, data) => {
      if (err) return res.json("Error");
      if (data.affectedRows > 0) {
        return res.json("success");
      } else {
        return res.json("No record updated");
      }
    }
  );
});

app.listen(3006, () => {
  console.log('Listening......');
});
