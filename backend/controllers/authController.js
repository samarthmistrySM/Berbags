const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { fullname, email, password, contact } = req.body;

  try {
    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .send("User already exists, please use a different email");
    }

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;

        const user = await userModel.create({
          fullname,
          email:email.toLowerCase(),
          password: hash,
          contact,
          isAdmin:false
        });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.cookie("token", token);

        res.status(201).send("User registered successfully");
      });
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Server error");
  }
};

const logInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email:email.toLowerCase() });

    if (!user) {
      return res.status(400).send("User not found, Please register first");
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;

      if (!result) {
        return res.status(400).send("Password Invalid!, Try again..");
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token);

      res.status(200).json({token,message:"User Logged!"});
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Server error");
  }
};

const isLoggedIn = (req, res, next) => {
  if (req.cookies.token == "") return res.redirect("/");
  else {
    jwt.verify(req.cookies.token, "shhhhh", (err, decoded) => {
      if (err) return res.redirect("/");
      req.user = decoded;
    });
    next();
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};

module.exports = { registerUser, logInUser, isLoggedIn, logoutUser };
