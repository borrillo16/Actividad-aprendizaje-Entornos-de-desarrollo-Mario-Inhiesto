const express = require('express');

const { body, validationResult } = require('express-validator');
const { getCategorias, getCategoriaPorId, postCategoria, putCategoria, deleteCategoriaPorId } = require('../controller/categorias');

const router = express.Router();

router.get('/categorias', getCategorias);
router.get('/categorias/:id', getCategoriaPorId);


router.post(
    '/categorias',
    [body("nombre").notEmpty().withMessage("El nombre es obligatorio")],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
        next();
    },
    postCategoria
);


router.put('/categorias/:id', putCategoria);


router.delete('/categorias/:id', deleteCategoriaPorId);

module.exports = router;
