const express = require('express');
const router = express.Router();

const { getAutores, getAutoresPorId, postAutor, putAutor, deleteAutorPorId } = require('../controller/autores.js');

router.get('/autores', getAutores);
router.get('/autores/:id', getAutoresPorId);
router.post('/autores', postAutor);
router.put('/autores/:id', putAutor);
router.delete('/autores/:id', deleteAutorPorId);


module.exports = router;


