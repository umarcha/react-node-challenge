module.exports = (sequelize, DataTypes, bcrypt) => {
 const User = sequelize.define("users", {
  firstName: {
   type: DataTypes.STRING(12),
   allowNull: false,
   validate: {
    isAlpha: true,
   },
  },
  lastName: {
   type: DataTypes.STRING(12),
   allowNull: true,
   validate: {
    isAlpha: true,
   },
  },
  email: {
   type: DataTypes.STRING(64),
   allowNull: false,
   validate: {
    isEmail: true,
   },
   set(value) {
    this.setDataValue("email", value.toLowerCase());
   },
  },
  password: {
   type: DataTypes.STRING,
   unique: false,
   set(value) {
    this.setDataValue("password", bcrypt.hashSync(value, 8));
   },
  },
 });

 return User;
};
