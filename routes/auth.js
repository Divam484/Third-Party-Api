const router = require("express").Router();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("./../model/usermodel");

mongoose
  .connect("mongodb://localhost:27017/googleSignIn")
  .then(() => console.log("Db connect"))
  .catch((err) => console.log(err, "it has an error"));

router.get("/login/success", (req, res) => {
  if (req.user) {
    const userNew = new User({
      name: req.user.displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
    });
    userNew.save().catch((err) => console.log(err));
    // console.log(
    //   req.user.displayName,
    //   req.user.emails[0].value,
    //   req.user.photos[0].value
    // );
    res.status(200).json({
      error: false,
      message: "successfully Login In",
      user: req.user,
    });
  } else {
    res.status(403).json({
      error: true,
      message: "Not Authorized",
    });
  }
});
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "login failure",
  });
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
