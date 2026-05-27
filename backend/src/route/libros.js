const express = require('express');
const router = express.Router();

const {getLibros, getLibroPorId, postLibro, putLibro, deleteLibro} = require('../controller/libros.js');

router.get('/libros', getLibros);
router.get('/libros/:id', getLibroPorId);
router.post('/libros', postLibro);
router.put('/libros/:id', putLibro);
router.delete('/libros/:id', deleteLibro);

module.exports = router;

