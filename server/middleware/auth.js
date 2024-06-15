const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authoriztion token is missing" });
  }
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), "myjwtsecretkey");
    req.admin = decoded;
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};
