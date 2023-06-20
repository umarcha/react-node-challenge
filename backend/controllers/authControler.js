var db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//config service
const LoggerService = require("../config/logger");
// strings
const STRINGS = require("../utils/texts");

require("dotenv").config();

var User = db.user;
const ENV = process.env;

const CreateUser = async (req, res) => {
  const { email } = req?.body;
  try {
    let isEmailExist = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (isEmailExist) {
      let message = STRINGS.TEXTS.userAlreadyRegisteredWithEmail;
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.FORBIDDEN,
        message,
        res
      );
    }
    await User.create(req?.body);
    return LoggerService.LoggerHandler(
      STRINGS.STATUS_CODE.CREATED,
      STRINGS.TEXTS.userCreated,
      res
    );
  } catch (error) {
    console.log("User Register Error-->", error.message);
    LoggerService.LoggerHandler(
      STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      res
    );
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req?.body;

  try {
    let user = await User.findOne({
      where: {
        email: email.toLowerCase(),
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (!user) {
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.NOT_FOUND,
        STRINGS.ERRORS.userNotExists,
        res
      );
    }

    var passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.NOT_FOUND,
        STRINGS.ERRORS.passwordInvalid,
        res
      );
    }
    
    let token = jwt.sign({ id: user.id }, `${ENV.JWT_SECRET}`);

    return LoggerService.LoggerHandler(
      STRINGS.STATUS_CODE.SUCCESS,
      STRINGS.TEXTS.userLogin,
      res,
      { token, user }
    );
  } catch (e) {
    let obj = {
      status: 500,
      message: e.message,
    };
    res.status(500).json(obj);
  }
};

const UpdateUSer = async (req, res) => {
  const { id } = req.user;
console.log(id,"id")
  try {
    let user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return LoggerService.LoggerHandler(
        STRINGS.STATUS_CODE.NOT_FOUND,
        STRINGS.ERRORS.userNotExists,
        res
      );
    }
    await user.update(req?.body);
    await user.save();
    return LoggerService.LoggerHandler(
      STRINGS.STATUS_CODE.SUCCESS,
      STRINGS.TEXTS.profileUpdated,
      res,
      { user: user }
    );
  } catch (error) {
    LoggerService.LoggerHandler(
      STRINGS.STATUS_CODE.INTERNAL_SERVER_ERROR,
      error.message,
      res
    );
  }
};

module.exports = {
  CreateUser,
  LoginUser,
  UpdateUSer,
};
