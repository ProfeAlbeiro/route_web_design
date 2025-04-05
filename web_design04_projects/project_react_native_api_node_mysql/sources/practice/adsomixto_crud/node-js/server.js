const express = require('express');
const passport = require('passport');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const mysql = require('mysql2');
const db  = require('./config/config.js');
/**
 * Importar las rutas
 */
const userRoutes = require('./routes/userRoutes');


const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extendd: true}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.disable('x-powered-by');//Disable the x-powered-by header in the response

app.set('port',port);
/**
 * Llamado las rutas
 */
userRoutes(app);
// Iniciando el servidor
// direccion ip V4 de la maquina consultar ipconfig
server.listen(3000, '192.168.1.13' || 'localhost', function() {
    console.log('Aplicacion de NodeJs' + process.pid + 'ejecutando en ' + server.address().address + ' : ' + server.address().port);
});

/**Rutas */

app.get('/', (req, res) => {
    res.send('estas en la Ruta raiz de Backend');
});

app.get('/test', (req, res) => {
    res.send('estas en la Ruta test');
});
//Manejo de errores
//Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
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
    console.log('192.168.1.13 port 3000');
  });

