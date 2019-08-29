const express = require('express');

const router = express.Router();
module.exports = router;

// var mongoose = require('mongoose');
var Plant = require('../models/plant.model.js');


// Get all plants
router.get('/', function(req, res, next) {
    Plant.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

// GET SINGLE PLANT BY ID 
router.get('/:id', function(req, res, next) {
    Plant.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});
  
// SAVE PLANT 
router.post('/add', function(req, res, next) {
    Plant.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
  
// UPDATE PLANT 
router.put('/:id', function(req, res, next) {
    Plant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});
  
// DELETE PLANT 
router.delete('/:id', function(req, res, next) {
    Plant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});