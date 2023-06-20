const Sequelize = require("sequelize");
require("dotenv").config();



const {HOST, DB_USER, PASSWORD, DB, DB_PORT} = process.env;

const sequelize = new Sequelize(DB_USER, DB, PASSWORD, {
 host: HOST,
 port: DB_PORT,
 dialect: "postgres",
 password: PASSWORD,
});

module.exports = sequelize;
