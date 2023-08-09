const { UnauthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("No Token Provide");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRATE);
    const { id, username } = decode;
    req.user = { id, username };
    next();
  } catch (err) {
    throw new UnauthenticatedError("Not Authorize to acces this tool");
  }
};

module.exports = authMiddleware;
