const STRINGS = require("../utils/texts");
const util = require("util");

var db = require("../models");
var User = db.user;
const JWT = require("jsonwebtoken");



function auth() {
  return async (req, res, next) => {
    const header = req.get("Authorization");
    if (!header || !header.startsWith("Bearer")) {
      return res.status(401).json({ message: STRINGS.ERRORS.tokenInvalid });
    }

    try {
      const token = header.split(" ")[1];
      const jwtVerifyAsync = util.promisify(JWT.verify);
      let decoded = await jwtVerifyAsync(token, process.env.JWT_SECRET);
console.log(decoded,"decoded")
      // let role = role;
      let _id = String(decoded.id);

      let user = await User.findOne({
        where: {
          id: _id,
        },
      });
      if (!user)
        return res.status(401).json({ message: STRINGS.ERRORS.userNotFound });

      req.user = user;
      req.userId = user.id;
      next();
    } catch (err) {
      console.log("err--->", err);
      return res.status(401).json({ message: STRINGS.ERRORS.tokenExpired });
    }
  };
}

module.exports = auth;
