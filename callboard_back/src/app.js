const passport = require('passport');
const cors = require('cors');

const express = require('express');
const cookieParser = require('cookie-parser');
const http = require('http');

const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const createUser = require('./routes/createUser')

const connect = require('./models/db_models')
connect.Connect.sync().then()

const app = express();
const port = 3080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createUser', createUser);

const server = http.Server(app)

server.listen(port, () => {
    console.log(`SERVER LISTENING ON PORT: ${port}`)
})

module.exports = app;
