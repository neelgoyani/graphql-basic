const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  //   console.log(authHeader);
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token == "") {
    req.isAuth = false;
    return next();
  }
  let decodedToken;
  //   console.log(token);
  try {
    jwt.verify(token, "9879207104", (err, decoded) => {
      if (err) {
        throw err;
      } else {
        // console.log(decoded);
        decodedToken = decoded;
      }
    });
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }
  //   console.log(decodedToken);
  req.isAuth = true;
  req.userId = decodedToken.userId;
  next();
};
