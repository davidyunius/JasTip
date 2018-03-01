const {User,Destination,Transaction,Trip} = require('../models')
const express = require ('express')
const router = express.Router()
const Op = require('sequelize').Op

router.get('/',(req,res)=>{
  let err = null
  Trip.findAll({
    attributes:['id','userId','destinationId'],
    include:[User,Destination],
    order:[['id','ASC']]
  }).then(dataDestination=>{
    // res.send(dataDestination)
    res.render('titipers',{dataDestination:dataDestination,err:null})
  }).catch(err=>{
    res.send(err)
    // console.log('error ',err);
  })
})

router.get('/transaction/:idTrip',(req,res)=>{
    Trip.findOne({
      attributes:['id','destinationId','userId'],
      where:{
        userId:req.params.idTrip,
      },
      include:[Transaction]
    })
    .then(dataTrip=>{
      // console.log(dataTrip.dataValues.id);
      // res.send(dataTrip)
      res.render('titipers_view',{dataTrip})
    })
  })



router.post('/transaction/:idTrip',(req,res)=>{
  Transaction.create({
    tripId:req.params.id,
    userId:req.body.user,
    barang:req.body.barang,
    jumlahBarang:req.body.jumlahBarang
  }).then(()=>{
    res.redirect(req.get(`referer`))
  })
})

module.exports = router;
