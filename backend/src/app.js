<<<<<<< HEAD
const express = require('express');

const autoresRoutes = require('./route/autores.js');
=======
const express = require('express'); 
const cors = require('cors'); 
const knex = require('knex');
const { body, validationResult } = require("express-validator");
const { db } = require("./db");
>>>>>>> 449474fee47f02b9c28f3aa4f962eb2ef4b04c64

const app = express();
app.use(express.json());
<<<<<<< HEAD

app.use('/', autoresRoutes);
=======
app.use(express.urlencoded({ extended: true }));

app.get('/autores', async (req, res) => {

});
>>>>>>> 449474fee47f02b9c28f3aa4f962eb2ef4b04c64


app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});
