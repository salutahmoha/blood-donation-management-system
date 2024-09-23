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
  const sql =
    'SELECT * FROM donor_details WHERE LOWER(Blood_group) = LOWER(?) AND LOWER(Home_address) = ?';

  db.query(sql, [req.body.Blood_group, req.body.Home_address], (err, data) => {
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

app.listen(3005, () => {
  console.log('Listening......');
});
