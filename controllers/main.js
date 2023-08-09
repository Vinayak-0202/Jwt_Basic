const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;
  const id = Date.now();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRATE, {
    expiresIn: "30d",
  });
  if (!username || !password) {
    throw new CustomAPIError("pleasr provide user name and password", 400);
  }
  res.status(200).json({ message: "User is Created ", token });
};

const dashBoard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomAPIError("No Token Provide", 401);
  }
  const token = authHeader.split(" ")[1];
  console.log(token);

  //console.log(req.headers);
  res.status(200).json({
    msg: `Hello vinayak`,
    secret: `your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashBoard,
};
