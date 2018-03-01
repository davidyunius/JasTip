const express = require('express')
const body = require('body-parser')
const app = express()

let index = require('./routes/index')
let user = require ('./routes/users')
let berangkaters = require ('./routes/berangkaters')
let titipers = require ('./routes/titipers')

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(body.json())
app.use(body.urlencoded({ extended: false }))

app.use('/users',user)
app.use('/berangkaters',berangkaters)
app.use('/titipers',titipers)
app.use('/',index)







app.listen(3000, function(){
  console.log('AYE AYE CAPT:3000');
})
