const Users = require("../models/Users");

// USER SIGN-UP

exports.signup = (req, res) => {
  const { email, password, isSeller, fullName } = req.body;

  Users.findOne({ email }).then((isUser) => {
    if (isUser) return res.send({ err: "Email-Id Already exists" });
    const role = isSeller ? 1 : 0;
    const user = new Users({ email, password, fullName, role });
    user
      .save()
      .then((user) => {
        return res.send({ msg: "Signed-Up Successfully", user });
      })
      .catch((err) => {
        res.status(400).send({ err: "Unable to signup something went wrong",errMsg:err });
      });
  });
};

// USER SIGN-IN

exports.signin = (req, res) => {
  const { email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          err: "USER email does not exists",
        });
      }
      if (!user.autheticate(password)) {
        return res.status(401).json({
          err: "Email and password do not match",
        });
      }
      return res.send({ msg: "Signup successfully", user });
    })
    .catch((err) => {
      return res.status(400).json({
        err: "Something went wrong",
      });
    });
};
