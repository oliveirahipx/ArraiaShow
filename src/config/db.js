import mysql from 'mysql2';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '20241802',
    database: 'arraia_show'
});