var db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

var User = db.user;

const CreateUser = async (req, res) => {
 const {email} = req?.body;
 try {
  let check = await User.findOne({
   where: {
    email: email.toLowerCase(),
   },
  });

  if (check) {
   let obj = {
    status: 400,
    message: "User already exist!",
   };
   res.status(400).json(obj);
  } else {
   let user = await User.create(req?.body);
   let obj = {
    status: 200,
    data: user,
    message: "User successfully created!",
   };
   res.status(200).json(obj);
  }
 } catch (e) {
  let obj = {
   status: 500,
   message: e?.message?.split(":")[1],
  };
  res.status(500).json(obj);
 }
};

const LoginUser = async (req, res) => {
 const {email, password} = req?.body;

 try {
  let user = await User.findOne({
   where: {
    email: email.toLowerCase(),
   },
   attributes: {exclude: ["createdAt", "updatedAt"]},
  });

  if (!user) {
   let obj = {
    status: 404,
    message: "User not found!",
   };
   res.status(404).json(obj);
  } else {
   var passwordIsValid = await bcrypt.compare(password, user.password);

   let token = jwt.sign({id: user.id}, "JWTKey");

   if (passwordIsValid) {
    let obj = {
     status: 200,
     user,
     authToken: token,
     message: "Request successfully hit!",
    };
    res.header({authToken: token}).status(200).json(obj);
   } else {
    let obj = {
     status: 400,
     message: "Password is not valid!",
    };
    res.status(400).json(obj);
   }
  }
 } catch (e) {
  let obj = {
   status: 500,
   message: e,
  };
  res.status(500).json(obj);
 }
};

const UpdateUSer = async (req, res) => {
 const {id} = req.user;

 try {
  let user = await User.findOne({
   where: {
    id,
   },
  });

  if (!user) {
   let obj = {
    status: 400,
    message: "User already exist!",
   };
   res.status(400).json(obj);
  } else {
   await user.update(req?.body);
   await user.save();
   let obj = {
    status: 200,
    data: user,
    message: "User successfully created!",
   };
   res.status(200).json(obj);
  }
 } catch (e) {
  let obj = {
   status: 500,
   message: e,
  };
  res.status(500).json(obj);
 }
};

module.exports = {
 CreateUser,
 LoginUser,
 UpdateUSer,
};
