const express = require('express');
const Model = require('../models/index');
const router = express.Router();

console.log("we made changes");

router.get('/api/customer/items', function (req, res){

  Model.Item.findAll({})
  .then(function(data){
    console.log(data);
    res.json({items: data})
  }).catch(function(err){
    console.log(err);
    res.status(500).json({ error: 'message' });

  })

  // res.setHeader('Content-type', 'application/json');
  // console.log("got it");
  // res.send('Hey')
});



router.post('/api/customer/items/:itemId/purchases', function(req, res){

let item;

  Model.Item.findById(req.params.itemId)
.then(function(data){
  item = data;
  if((req.body.paid >= data.price) && (data.quantity > 0) ){
    Model.Purchase.create({
      amountPaid: Number(req.body.paid),
      itemId: req.params.itemId

// if ( amountPaid >= data.price ){
// data.quantity - 1
//
    }).then(function(data){
      item.update({
        quantity: item.quantity - 1,
      }).then(function(data){
        res.send("Thanks for buying candy")
      })
    }).catch(function(err){
      res.send("error", err)
    })
  } else if(req.body.paid < data.price){

    res.send("You have not paid enough")
  } else {
    res.send("We dont have enough")
  }
}).catch(function(err){
   res.send("error", err)
})


});


router.get('/api/vendor/purchases', function(req, res){

  Model.Purchase.findAll({
  }).then(function(data){
  Model.Purchase.sum('amountPaid')
  .then(function(data){
  res.json({ facts: data})
  })

  }).catch(function(err){
    res.status(500).send("You have not been able to see all of the purchases")
  })

});


router.get('/api/vendor/money', function(req, res){

  Model.Purchase.findAll()

});


router.post('/api/vendor/items', function(req, res){

Model.Item.create({
    name: req.body.name,
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
}).then(function(data){
  res.status(201).send("You created it!")
}).catch(function(err){
  res.status(400).send("You created it wrong")
})
});


router.put('/api/vendor/items/:itemId', function(req, res){

  Model.Item.update({
    name: req.body.name,
    quantity: Number(req.body.quantity),
    price: Number(req.body.price)
  },
  {where: {id: req.params.itemId}})
  .then(function(data){
    console.log(data);
    res.json({ item: data})
    // res.status(201).send("You updated it!")
  }).catch(function(err){
    res.status(500).send("You did not update correctly")
  })

});




module.exports = router;
