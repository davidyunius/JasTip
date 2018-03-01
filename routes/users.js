const {User,Destination} = require('../models')
const express = require ('express')
const router = express.Router()

router.get('/',(req,res)=>{
  let err = null
  User.findAll({
    order:[['id','ASC']]
    // ,include:[Destination]
  }).then(dataUsers=>{
    // res.send(dataUser)
    res.render('users',{dataUsers:dataUsers,err})
  }).catch(err=>{
    res.send(err)
  })
})

router.get('/add',(req,res)=>{
  res.render('addUser',{err:null})
})

router.post('/add',(req,res)=>{
  User.create({
    name:req.body.name,
    email:req.body.brand,
    password:req.body.codeitem
  })
  .then(()=>{
    res.redirect('/items')
  })
  .catch(err=>{
    // res.send(err.errors)
    res.render('addUser',{err:err})
  })
})

router.get('/update/:id',(req,res)=>{
  User.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataUser=>{
    res.render('updateUser',{dataUser:dataUser,err:null})
  })
})

router.post('/update/:id',(req,res)=>{
  let objUpdate = {
    id:req.body.id,
    name:req.body.name,
    brand:req.body.brand,
    codeitem:req.body.codeitem
  }
  User.findOne({
    where:{
      id:req.params.id
    }
  }).then(dataUser=>{
    let a = JSON.parse(JSON.stringify(dataUser))
    User.update(objUpdate,{
      where:{
        id:a.id
      }
    }).then(()=>{
      res.redirect('/items')
    }).catch(err=>{
      console.log(err);
      res.render('updateUser',{dataUser:a,err:err})
    })
  }).catch(err=>{
    res.render('updateUser',{dataUser:a,err:err})
  })
})

router.get('/delete/:id',(req,res)=>{
  User.destroy({
    where:{
      id:req.params.id
    }
  }).then(()=>{
    res.redirect('/items')
  })
})



module.exports = router;
