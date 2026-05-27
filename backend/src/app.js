const express = require('express');
const cors = require('cors');

const autoresRoutes = require('./route/autores.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', autoresRoutes);

app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});
