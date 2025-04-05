const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'products_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// CRUD endpoints
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;
  db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, price });
  });
});

app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id], (err, results) => {
    if (err) throw err;
    res.json({ id, name, price });
  });
});

app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});