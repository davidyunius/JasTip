const {User,Destination,Transaction,Trip} = require('../models')
const express = require ('express')
const router = express.Router()
const Op = require('sequelize').Op

router.get('/',(req,res)=>{
  let err = null
  Destination.findAll({
    where:{
      id: req.session.dataUser
    },
    include:[User]
  }).then(dataDestination=>{
    // res.send(dataDestination)
    res.render('berangkater',{dataDestination:dataDestination,err:null})
  }).catch(err=>{
    res.send(err)
    // console.log('error ',err);
  })
})

router.get('/showlist/:idDestination/:idUser',(req,res)=>{
    Trip.findOne({
      attributes:['id','destinationId','userId'],
      where:{
        userId:req.params.idDestination,
        destinationId:req.params.idUser
      },
      include:[Transaction]
    })
    .then(dataTrip=>{
      // console.log(dataTrip.dataValues.id);
      // res.send(dataTrip)
      res.render('berangkater_view',{dataTrip})
    })
  })


router.get('/add',(req,res)=>{
  res.render('addDestination'
  ,{err:null})
})

router.post('/add',(req,res)=>{
  Destination.create({
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    // res.send(err.errors)
    res.render('addDestination',{err:err})
  })
})

router.get('/terima/:id',(req,res)=>{
  Destination
  .findOne({
    where:{
      id:req.params.id
    }
  }).then(dataDestinations=>{
    res.render('updateDestination',{dataDestination:dataDestination,err:null})
  })
})

router.get('/tolak/:id',(req,res)=>{
  Destination
  .findOne({
    where:{
      id:req.params.id
    }
  }).then(dataDestinations=>{
    res.render('updateDestination',{dataDestination:dataDestination,err:null})
  })
})

router.post('/update/:id',(req,res)=>{
  let objUpdate = {
    id:req.body.id,
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  }
  Destination
  .findOne({
    where:{
      id:req.params.id
    }
  }).then(dataDestinations=>{
    let a = JSON.parse(JSON.stringify(dataDestination))
    Destination.update(objUpdate,{
      where:{
        id:a.id
      }
    }).then(()=>{
      res.redirect('/items')
    }).catch(err=>{
      console.log(err);
      res.render('updateDestination',{dataDestinations:a,err:err})
    })
  }).catch(err=>{
    res.render('updateDestination',{dataDestination:a,err:err})
  })
})

router.get('/delete/:id',(req,res)=>{
  Destination.destroy({
    where:{
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/items')
  })
})

router.get('/titipers/:id',(req,res)=>{
  Destination.findAll()
  .then(dataDestination=>{

  })
})



module.exports = router;
