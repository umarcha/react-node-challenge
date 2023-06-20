const db = require("../models");

  const DBSync = async () => {
 try {
  await db.sequelize.authenticate();
  await db.sequelize.sync({force: true});
  console.log("Models Sync Succesfully");
 } catch (error) {
  console.log("There is some error in syncing models", error);
 }
};

DBSync();
