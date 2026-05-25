const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'biblioteca.db'
    },
    useNullAsDefault: true
});

exports.db = db;
