const express = require('express')
const Isemail = require('isemail')
const router = express.Router()
const Models = require('../models')
const bcrypt = require('bcrypt')
const auth = require('../helpers/authSession')

let title = 'User'
//user page
router.get('/', (req, res, next) => {
  Models.User.findAll().then(users => {
    res.render('user', {users, err: req.query.err})
  }).catch(err => {
    next(err)
  })
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

router.get('/login', auth, (req, res, next) => {
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
      let success = bcrypt.compare(req.body.password, user.password)
      if (success) {
        req.session.login = true
        req.session.user = user
        res.redirect('/')
      }
    }
  }).catch(next)
})

router.get('/logout', (req, res, next) => {
  req.session.destroy()
  res.redirect('/')
})



module.exports = router