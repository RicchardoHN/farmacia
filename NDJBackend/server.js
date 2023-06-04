const express = require('express');  // Express provides methods like: HTTP verb ( GET , POST , SET , etc.) and URL pattern ("Route")
const mysql = require('mysql');      // Some of the necessary binding needed for any web application to mysql database
const cors = require('cors');        // A front-end client can make requests for resources to an external back-end server


// npm install mysql
// npm install cors

const app=express();

app.use(express.json());            //  Inicializar el uso de JSON para cuando se invoque cualquier cosa de GET,POST,...
app.use(cors());                    //  app.use(middleware) is called every time a request is sent to the server. 

app.listen(8081,() => {
    console.log('NodeJS listening  ....');
});

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'007008',
    database:'farmacia',
    port:3306
});



// Login functions
app.post('/login',(req,res) => {
    const sql="select * from usuarios where nombre = ? and contrase = ?";
    const values=[
        req.body.usuario,
        req.body.password
    ]

    db.query(sql,[req.body.usuario,req.body.password],(err,data)=> {
        if (err) return res.json("Login Failed")
        else
        {
            if (data.length > 0)
                return res.json(0);   // "Login Successfully"  como en C o C++  , se regresa 0 si no hay error, 0 errores
            else
                return res.json(-1); // "Login Failed"  , aqui es que hay error
        }
    });
});

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    const sql = "SELECT * FROM productos";
    
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error al obtener los productos' });
      }
      
      res.json(data);
    });
  });