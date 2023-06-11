const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '007008',
  database: 'farmacia',
  port: 3306
});

// Login function
app.post('/login', (req, res) => {
  const sql = "SELECT * FROM usuarios WHERE nombre = ? AND contrase = ?";
  const values = [
    req.body.usuario,
    req.body.password
  ];

  db.query(sql, values, (err, data) => {
    if (err) return res.json("Login Failed");
    else {
      if (data.length > 0)
        return res.json(0); // "Login Successfully"
      else
        return res.json(-1); // "Login Failed"
    }
  });
});

// Get all products
app.get('/Products', (req, res) => {
  const sql = 'SELECT * FROM productos';

  db.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error al obtener los productos', message: err.message });
    }

    res.json(data);
  });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Servidor API en ejecución en http://localhost:${port}`);
});
