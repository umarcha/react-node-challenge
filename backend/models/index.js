const bcrypt = require("bcryptjs");
const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/db.config");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, DataTypes, bcrypt);
db.note = require("./notes.model")(sequelize, DataTypes, bcrypt);

db.user.hasMany(db.note, {foreignKey: "userId"});
db.note.belongsTo(db.user);

const connectWithDB = async () => {
 try {
  await db.sequelize.authenticate();
  console.log("Connection To Database Has Been Established");
 } catch (error) {
  console.log("There is some error in syncing models", error);
 }
};

connectWithDB();

module.exports = db;
