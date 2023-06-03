const Sequelize = require("sequelize");
require("dotenv").config();

const {HOST, USER, PASSWORD, DB, DB_PORT} = process.env;
const sequelize = new Sequelize("postgres", "postgres", "4999", {
 host: "localhost",
 port: 5432,
 dialect: "postgres",
 password: "4999",
});

module.exports = sequelize;
