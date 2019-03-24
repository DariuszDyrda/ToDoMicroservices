const router = require('express').Router();
const User = require('../models/user');
const passport = require('../config/passport')
const auth = require('./auth')

router.post("/login", (req, res, next) => {

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json(user.toAuthJSON());
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});
router.post("/register", (req, res) => {
    let newUser = new User({username: req.body.username});
    newUser.setPassword(req.body.password);
    newUser.save((err) => {
        if(err) {
          return res.json(err)
        } else {
          let user = newUser.toAuthJSON();
          return res.json(user);
        }
    })
})
router.get("/secret", auth.optional, (req, res) => {
  let user = req.user ? req.user.username : "Noone";
  res.json({message: `Congrats! You've reached a secret route as ${user}!`});
})
module.exports = router;