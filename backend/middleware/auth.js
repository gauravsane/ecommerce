const jwt = require("jsonwebtoken");
const JWT_SECRET = "fsfdsds655";
const auth = (req, res, next) => {
  //grab token from cookie
  console.log(req.cookies);
  const {token} = req.cookies;

  //if no token, stop here
  if (!token) {
    res.status(403).send("Please login first");
  }

  try {
    //decode that token and get id
    const decode = jwt.verify(token, JWT_SECRET);
    console.log(decode);
    req.user = decode
  } catch (error) {
    // console.log(error);
    res.status(401).send('Invalid token')
  }

  //qurey to DB for that user id
  return next()
};

module.exports = auth;
