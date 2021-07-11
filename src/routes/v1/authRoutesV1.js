//jshint esversion: 9

const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
// const User = require("../../models/user.js");

// app.use(
//   session({
//     secret: "our little secret!",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(cors({
//   origin: true,
//   credentials: true
// }));
// when login is successful, retrieve user info
router.get("/twitter/login/success", (req, res) => {
  console.log('/twitter/login/success: ', req.body);
  if (req.user) {
    res.json({
      success: true,
      message: "twitter user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/twitter/login/failed", (req, res) => {
  console.log('/login/failed: ', req.body);
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/twitter/logout", (req, res) => {
  console.log('/logout ', req.body);
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed"
  })
);

router.get('/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
  }));

router.get('/google/redirect',
  passport.authenticate('google', {
    // session: false,
    successRedirect: CLIENT_HOME_PAGE_URL,
    // failureRedirect: CLIENT_HOME_PAGE_URL
  }),
  function(req, res) {
    var token = req.user.token;
    console.log('****Auth REDIRECT****, req body: ', req.status, req.authInfo);
    // Successful authentication, redirect home.
    res.redirect('/secrets');
    // res.redirect("http://localhost:3000?token=" + token);
  });

router.get("/google/login/success", (req, res) => {
  console.log("/google/login/success", 'req.body: ', req.body, 'req.user: ', req.user);
  if (req.user) {
    res.json({
      success: true,
      message: "Google user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});


router.get("/google/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get("/google/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});


module.exports = router;
