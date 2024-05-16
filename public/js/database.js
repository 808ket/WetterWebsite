const mysql = require('mysql2/promise');
const config = require('./config');

async function query(sql, params) {
    try {
        const connection = await mysql.createConnection(config.db);
        const [results, ] = await connection.execute(sql, params);

        console.log(results);
        return results;
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    query
}