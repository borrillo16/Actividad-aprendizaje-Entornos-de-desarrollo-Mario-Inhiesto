const { db } = require('../configuration/db');

const buscarTodosAutores = async () => {
    const resultado = await db('autores').select('*');
    return resultado;
};


const buscarAutoresPorId = async (id) => {
    const resultado = await db('autores').select('*').where({ id }).first();
    return resultado;
};


const crearAutor = async (autor) => {
    const resultado = await db('autores').insert(autor);
    return resultado; 
};


const editarAutor = async (id, autor) => {
    return await db('autores')
        .where({ id })
        .update(autor);
};


const eliminarAutor = async (id) => {
    return await db('autores')
        .where({ id })
        .del();
};




module.exports = {
    buscarTodosAutores,
    buscarAutoresPorId,
    crearAutor,
    editarAutor,
    eliminarAutor
};
