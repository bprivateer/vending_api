const express = require('express');
const Model = require('../models/index');
const router = express.Router();



router.get('/api/customer/items', function (req, res){

})


router.post('/api/customer/items/:itemId/purchases', function(req, res){

})


router.get('/api/vendor/purchases', function(req, res){

})


router.get('/api/vendor/money', function(req, res){

})


router.post('/api/vendor/items', function(req, res){

})


router.put('/api/vendor/items/:itemId', function(req, res){

})


module.exports = router;
