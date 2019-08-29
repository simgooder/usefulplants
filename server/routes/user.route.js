const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

var User = require('../models/user.model.js');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert));


async function insert(req, res) {
    let user = await userCtrl.insert(req.body);
    res.json(user);
}

// Get all plants
router.get('/all', function(req, res, next) {
    User.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});
