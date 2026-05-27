const { buscarTodosAutores, crearAutor, buscarAutoresPorId, editarAutor, eliminarAutor } = require('../service/autores.js');


const getAutores = async (req, res) => {
    const datos = await buscarTodosAutores();
    res.status(200).json(datos);
};


const getAutoresPorId = async (req, res) => {
    const datos = await buscarAutoresPorId(req.params.id);

    if (!datos) {
        return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.status(200).json(datos);
};


const postAutor = async (req, res) => {
    const { nombre, pais } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const nuevoAutor = { nombre, pais };

    const id = await crearAutor(nuevoAutor);

    res.status(201).json({
        mensaje: "Autor creado correctamente",
        id: id[0],
        datos: nuevoAutor
    });
};


const putAutor = async (req, res) => {
    const { id } = req.params;
    const { nombre, pais } = req.body;

    
    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const autorActualizado = { nombre, pais };

    const resultado = await editarAutor(id, autorActualizado);

    if (resultado === 0) {
        return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({
        mensaje: "Autor actualizado correctamente",
        id,
        datos: autorActualizado
    });
};


const deleteAutorPorId = async (req, res) => {
    const { id } = req.params;

    const resultado = await eliminarAutor(id);

    if (resultado === 0) {
        return res.status(404).json({ error: "Autor no encontrado" });
    }

    res.json({
        mensaje: "Autor eliminado correctamente",
        id
    });
};


module.exports = {
    getAutores,
    getAutoresPorId,
    postAutor,
    putAutor,
    deleteAutorPorId
};

