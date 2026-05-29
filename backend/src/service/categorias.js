const { db } = require('../configuration/db');


const buscarTodasCategorias = async () => {
    return await db('categorias').select('*');
};


const buscarCategoriaPorId = async (id) => {
    return await db('categorias').select('*').where({ id }).first();
};


const crearCategoria = async (categoria) => {
    return await db('categorias').insert(categoria);
};


const editarCategoria = async (id, categoria) => {
    return await db('categorias')
        .where({ id })
        .update(categoria);
};


const eliminarCategoria = async (id) => {
    return await db('categorias')
        .where({ id })
        .del();
};

module.exports = {
    buscarTodasCategorias,
    buscarCategoriaPorId,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
};
