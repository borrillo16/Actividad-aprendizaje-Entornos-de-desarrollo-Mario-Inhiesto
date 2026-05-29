const { buscarTodasCategorias, buscarCategoriaPorId, crearCategoria, editarCategoria, eliminarCategoria } = require('../service/categorias.js');


const getCategorias = async (req, res) => {
    const datos = await buscarTodasCategorias();
    res.status(200).json(datos);
};


const getCategoriaPorId = async (req, res) => {
    const datos = await buscarCategoriaPorId(req.params.id);

    if (!datos) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.status(200).json(datos);
};


const postCategoria = async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const nuevaCategoria = { nombre };

    const id = await crearCategoria(nuevaCategoria);

    res.status(201).json({
        mensaje: "Categoría creada correctamente",
        id: id[0],
        datos: nuevaCategoria
    });
};


const putCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const categoriaActualizada = { nombre };

    const resultado = await editarCategoria(id, categoriaActualizada);

    if (resultado === 0) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({
        mensaje: "Categoría actualizada correctamente",
        id,
        datos: categoriaActualizada
    });
};


const deleteCategoriaPorId = async (req, res) => {
    const { id } = req.params;

    const resultado = await eliminarCategoria(id);

    if (resultado === 0) {
        return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({
        mensaje: "Categoría eliminada correctamente",
        id
    });
};

module.exports = {
    getCategorias,
    getCategoriaPorId,
    postCategoria,
    putCategoria,
    deleteCategoriaPorId
};
