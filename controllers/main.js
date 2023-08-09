const { BadRequestError } = require("../errors");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const { username, password } = req.body;
  const id = Date.now();
  const token = jwt.sign({ id, username }, process.env.JWT_SECRATE, {
    expiresIn: "30d",
  });
  if (!username || !password) {
    throw new BadRequest("pleasr provide user name and password");
  }
  res.status(200).json({ message: "User is Created ", token });
};

const dashBoard = (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  console.log(req.user);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `your lucky number is ${luckyNumber}`,
  });

  //console.log(req.headers);
};

module.exports = {
  login,
  dashBoard,
};
