const express = require('express');
const router = express.Router();

const { body, validationResult } = require("express-validator");

const { getLibros, getLibroPorId, postLibro, putLibro, deleteLibro } = require('../controller/libros.js');

router.get('/libros', getLibros);
router.get('/libros/:id', getLibroPorId);

router.post(
    '/libros',
    [
        body("titulo").notEmpty().withMessage("El título es obligatorio"),
        body("genero").notEmpty().withMessage("El género es obligatorio"),
        body("autor_id").isInt({ min: 1 }).withMessage("El autor es obligatorio"),
        body("categoria_id").isInt({ min: 1 }).withMessage("La categoría es obligatoria")


    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    },
    postLibro
);

router.put('/libros/:id', putLibro);
router.delete('/libros/:id', deleteLibro);

module.exports = router;


