const {User,Destination,Transaction,Trip} = require('../models')
const express = require ('express')
const router = express.Router()
const Op = require('sequelize').Op
const auth = require('../helpers/authSession')

router.get('/', auth.checkTitip,(req,res)=>{
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

  })
})

router.get('/transaction/:idTrip', auth.checkTitip,  (req,res)=>{
    Trip.findOne({
      attributes:['id','destinationId','userId'],
      where:{
        userId:req.params.idTrip,
      },
      include:[Transaction]
    })
    .then(dataTrip=>{
      // console.log(dataTrip.dataValues.id);
      res.render('titipers_view',{dataTrip})
    })
  })



router.post('/transaction/:idTrip',(req,res)=>{


  Transaction.create({
    tripId:req.params.idTrip,
    userId: req.session.dataUser,
    barang:req.body.barang,
    jumlahBarang:req.body.jumlahBarang,
    status: req.body.status
  }).then(()=>{
    res.redirect(req.get(`referer`))
  })
})

router.get('/transaction/:id',(req,res)=>{
  Transaction.findAll({
    where:{
      id:req.session.dataUsers
    }
  }).then(dataTransactions=>{
    res.render('userTrans',{dataTransactions})
  })
})

module.exports = router;
