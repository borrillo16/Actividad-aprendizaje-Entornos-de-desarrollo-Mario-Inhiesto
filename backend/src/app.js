const express = require('express'); 
const cors = require('cors'); 
const knex = require('knex');
const { body, validationResult } = require("express-validator");
const { db } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/autores', async (req, res) => {

});


app.listen(8080, () => {
  console.log("Servidor iniciado en http://localhost:8080");
});
