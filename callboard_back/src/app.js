import express from "express";

import cookieParser from 'cookie-parser';
import http from 'http';

// import routes from './routes';
import passport from 'passport';
import cors from 'cors';

import userController from "./routes/userController.js";
import Connect from "./models/db_models.js"

Connect.sync().then()
const app = express();
const port = 3080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

// app.use('/', routes);
app.use('/users', userController);

const server = http.Server(app)

server.listen(port, () => {
    console.log(`SERVER LISTENING ON PORT: ${port}`)
})

export default app;
