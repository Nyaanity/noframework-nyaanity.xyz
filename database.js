const mariadb = require('mariadb');
const dotenv = require('dotenv').config({ path: './.env' });

const pool = mariadb.createPool({
    'host': process.env.DB_HOST,
    'port': process.env.DB_PORT,
    'user': process.env.DB_USER,
    'password': process.env.DB_PASSWORD,
    'database': process.env.DB_DATABASE,
    'connectionLimit': process.env.DB_CONNECTION_LIMIT
});

pool.query(`CREATE TABLE IF NOT EXISTS auth(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    username TEXT,
    usedKey TEXT,
    hashedPassword TEXT,
    isHalted TEXT,
    createdAt TIMESTAMP,
    apiKey TEXT,
        PRIMARY KEY (id))`);
        
pool.query(`CREATE TABLE IF NOT EXISTS authkeys(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    name TEXT,
    createdAt TIMESTAMP,
    endsAt TIMESTAMP,
    PRIMARY KEY (id))`);

    console.log(    'host: ', process.env.DB_HOST,
    'port: ', process.env.DB_PORT,
    'user: ', process.env.DB_USER,
    'password: ', process.env.DB_PASSWORD,
    'database: ', process.env.DB_DATABASE,
    'connectionLimit: ', process.env.DB_CONNECTION_LIMIT)

console.log('Connected to database: ' + process.env.DB_DATABASE);

exports.pool = pool;

