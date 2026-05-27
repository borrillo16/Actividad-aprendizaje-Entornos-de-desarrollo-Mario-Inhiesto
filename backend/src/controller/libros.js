const {buscarTodosLibros, buscarLibroPorId, crearLibro, editarLibro, eliminarLibro} = require('../service/libros.js');


const getLibros = async (req, res) => {
    const datos = await buscarTodosLibros();
    res.status(200).json(datos);
};


const getLibroPorId = async (req, res) => {
    const datos = await buscarLibroPorId(req.params.id);

    if (!datos) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.status(200).json(datos);
};


const postLibro = async (req, res) => {
    const { titulo, genero, autor_id } = req.body;

    if (!titulo || !autor_id) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevoLibro = { titulo, genero, autor_id };

    const id = await crearLibro(nuevoLibro);

    res.status(201).json({
        mensaje: "Libro creado correctamente",
        id: id[0],
        datos: nuevoLibro
    });
};


const putLibro = async (req, res) => {
    const { id } = req.params;
    const { titulo, genero, autor_id } = req.body;

    const libroActualizado = { titulo, genero, autor_id };

    const resultado = await editarLibro(id, libroActualizado);

    if (resultado === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json({
        mensaje: "Libro actualizado correctamente",
        id,
        datos: libroActualizado
    });
};


const deleteLibro = async (req, res) => {
    const { id } = req.params;

    const resultado = await eliminarLibro(id);

    if (resultado === 0) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json({
        mensaje: "Libro eliminado correctamente",
        id
    });
};


module.exports = {
    getLibros,
    getLibroPorId,
    postLibro,
    putLibro,
    deleteLibro
};
