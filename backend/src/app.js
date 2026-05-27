const express = require('express');

const autoresRoutes = require('./route/autores.js');

const app = express();
app.use(express.json());

app.use('/', autoresRoutes);

app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});
