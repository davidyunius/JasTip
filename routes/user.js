const express = require('express')
const Isemail = require('isemail')
const router = express.Router()
const Models = require('../models')
const bcrypt = require('bcrypt')
const auth = require('../helpers/authSession')

let title = 'User'
//user page
// router.get('/', (req, res, next) => {
//   Models.User.findAll().then(users => {
//     let checkLogin = false 
//     if (req.session.login) {
//       checkLogin = true
//     }
//     res.render('index', {users, err: req.query.err, checkLogin})
//   }).catch(err => {
//     next(err)
//   })
// })

router.get('/', (req, res) => {
  let checkLogin = false
  if (req.session.login) {
    checkLogin = true
  }
  res.render('index')
})

router.get('/register', (req, res, next) => {
    res.render('register')
})

router.post('/register', (req, res, next) => {
  Models.User.create({
    name: req.body.name,
    role: req.body.role,
    status: req.body.status || 0,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(data => {
    res.redirect('/users/register')
  }).catch(err => {
    if (!err.errors[0]) {
      err.errors[0].message = null
    }
    res.redirect(`/users/register?err=${err.errors[0].message}`)
  })
})

router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post('/login', (req, res, next) =>{
  let email = req.body.email
  let password = req.body.password
  Models.User.findOne({
    where: {
      email: email
    }
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password).then(isSuccess => {
        req.session.login = true
        req.session.dataUser = {id: user.id}
        req.session.role = user.role
        if (isSuccess) {
          if (user.role === '1') {
            res.redirect('/users/jasa')
          } else if (user.role === '2') {
            res.redirect('/users/titip')
          }
        } else {
          res.redirect('/users/login')
        }
      })
    }
  }).catch(next)
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/users/login')
})

router.get('/jasa', auth.checkJasa, (req, res, next) => {
  res.render('jasa')
})

router.get('/titip', auth.checkTitip, (req, res, next) => {
  res.render('titip')
})


module.exports = router