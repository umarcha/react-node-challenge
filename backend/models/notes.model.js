module.exports = (sequelize, DataTypes, bcrypt) => {
 const Note = sequelize.define("notes", {
  title: {
   type: DataTypes.STRING,
  },
  description: {
   type: DataTypes.STRING,
  },
  status: {
   type: DataTypes.STRING,
  },
 });

 return Note;
};
