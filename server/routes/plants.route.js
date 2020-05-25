const express = require('express');

const router = express.Router();
module.exports = router;

// var mongoose = require('mongoose');
var Plant = require('../models/plant.model.js');


// GET ALL PLANTS
router.get('/', function(req, res, next) {
    Plant.find(function (err, plants) {
        if (err) return next(err);
        res.json(plants);
    });
});

// GET SINGLE PLANT BY ID 
router.get('/:id', function(req, res, next) {
    Plant.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

// SEARCH PLANT BY QUERY
router.get('/q/:q', function(req, res, next) {
    Plant.find( { $text: { $search: req.params.q, $caseSensitive :false } }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
})

// Get all plants that meet criteria
router.get('/related/:reference', function(req, res, next) {

    let prop = req.query.prop;
    let val = req.query.val;
    let limit = Number(req.query.limit);
    let ref = req.params.reference;

    Plant.find( { $and: [ { [prop] : val }, { _id: { $ne: ref } } ] }, function (err, post) {
        if (err) return next(err);
        res.json(post);
    }).limit(limit);
})

  
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
