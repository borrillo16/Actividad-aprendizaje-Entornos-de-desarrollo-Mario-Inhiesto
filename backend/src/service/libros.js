const { db } = require('../configuration/db');

const buscarTodosLibros = async () => {
    const resultado = await db('libros').select('*');
    return resultado;
};

const buscarLibroPorId = async (id) => {
    const resultado = await db('libros').select('*').where({ id }).first();
    return resultado;
};

const crearLibro = async (libro) => {
    const resultado = await db('libros').insert(libro);
    return resultado;
};

const editarLibro = async (id, libro) => {
    return await db('libros')
        .where({ id })
        .update(libro);
};

const eliminarLibro = async (id) => {
    return await db('libros')
        .where({ id })
        .del();
};

module.exports = {
    buscarTodosLibros,
    buscarLibroPorId,
    crearLibro,
    editarLibro,
    eliminarLibro
};
