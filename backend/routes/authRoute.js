const express = require("express");
const authCtrl = require("../controllers/authControler");
const {auth} = require("../middelwares/auth");

const authRouter = express.Router();
authRouter.route("/register").post(authCtrl.CreateUser);
authRouter.route("/login").post(authCtrl.LoginUser);
authRouter.route("/update").put(auth, authCtrl.UpdateUSer);

module.exports = authRouter;
