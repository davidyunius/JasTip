const {User,Destination,Transaction,Trip} = require('../models')
const express = require ('express')
const router = express.Router()
const Op = require('sequelize').Op

router.get('/',(req,res)=>{
  let err = null
  User.findOne({
    where:{
      id:2
    },
    include:[Destination]
  }).then(dataUsers=>{
    // res.send(dataUsers)
    res.render('berangkater',{dataUsers,err:null})
  }).catch(err=>{
    res.send(err)
    // console.log('error ',err);
  })
})

router.get('/showlist/:idUser/:idDestination',(req,res)=>{
    Trip.findOne({
      attributes:['id','destinationId','userId'],
      where:{
        userId:req.params.idUser,
        destinationId:req.params.idDestination
      },
      include:[Transaction]
    })
    .then(dataTrip=>{
      // console.log(dataTrip.dataValues.id);
      // res.send(dataTrip.Transactions[0])
      res.render('berangkater_view',{dataTrip})
    })
  })


router.get('/add',(req,res)=>{
  res.render('addDestination'
  ,{err:null})
})

router.post('/add',(req,res)=>{
  Destination.create({
    location:req.body.location,
    departure:req.body.departure,
    arrival:req.body.arrival,
    createdAt:new Date(),
    updatedAt:new Date()
  })
  .then((dataDestination)=>{
    Trip.create({
      destinationId:dataDestination.id,
      userId:req.session.userName
    })
    res.redirect('/users/berangkaters')
  })
  .catch(err=>{
    // res.send(err.errors)
    res.render('addDestination',{err:err})
  })
})

router.get('/terima/:id',(req,res)=>{
  let obj = {
    status:'2'
  }
  Transaction.update(obj,{
    where:{
      id:req.params.id
    }
  }).then(dataDestinations=>{
    res.redirect(req.get(`referer`))
  })
})

router.get('/tolak/:id',(req,res)=>{
  let obj ={
    status:'3'
  }
  Transaction.update(obj,{
    where:{
      id:req.params.id
    }
  }).then(dataDestinations=>{
    res.redirect(req.get(`referer`))
  })
})

router.get('/update/:id',(req,res)=>{
  Destination.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataDestination=>{
    res.render('updateDestination',{dataDestination})
  })
})

router.post('/update/:id',(req,res)=>{
  let objUpdate = {
    location:req.body.location,
    departure:req.body.departure,
    arrival:req.body.arrival
  }
  Destination.update(objUpdate,{
    where:{
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/berangkater')
  })
})

router.get('/delete/:id',(req,res)=>{
  Destination.destroy({
    where:{
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/berangkater')
  })
})

module.exports = router;
