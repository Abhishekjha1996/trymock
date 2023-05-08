const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    const ver = jwt.verify(token, "secretkey");
    if (ver) {
      req.body._id = ver._id;
      next();
    } else {
      res.status(404).send({ msg: "please login first" });
    }
  } else {
    res
      .status(404)
      .send({ msg: "please login first to get token no Token found" });
  }
};

module.exports = {
  auth,
};
