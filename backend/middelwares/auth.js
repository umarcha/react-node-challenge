const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
 // const token = req.header('authToken');
 var token = req.body.token || req.query.token || req.header("Authorization");
 if (token.startsWith("Bearer ")) {
  token = token.substring(7, token.length);
 }

 if (!token) {
  return res.json({
   status: 0,
   message: "access denied no token provided ",
  });
 }
 try {
  const payload = jwt.verify(token, "JWTKey");
  req.user = payload;
  next();
 } catch (e) {
  console.log(e);
  res.json({
   status: 400,
   message: e.error || "assecc denied not token found",
  });
 }
};
