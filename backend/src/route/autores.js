const express = require('express');
const router = express.Router();

const { body, validationResult } = require("express-validator");

const { getAutores, getAutoresPorId, postAutor, putAutor, deleteAutorPorId } = require('../controller/autores.js');

router.get('/autores', getAutores);
router.get('/autores/:id', getAutoresPorId);

router.post(
    '/autores',
    [
        body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
        body("pais").notEmpty().withMessage("El país es obligatorio")
    ],
    (req, res, next) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errores: error.array() });
        }
        next();
    },
    postAutor
);

router.put('/autores/:id', putAutor);
router.delete('/autores/:id', deleteAutorPorId);

module.exports = router;



