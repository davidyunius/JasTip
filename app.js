const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const session = require('express-session')
const morgan = require('morgan')

const index = require('./routes/index')
const users = require('./routes/user')
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(cookieParser())
app.use(session({
    key: 'user_sid',
    secret: 'iloveyou',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use('/', index)
app.use('/users', users)

app.listen(3000, () => {
    console.log('App is now listening on port 3000');
})

module.exports = app