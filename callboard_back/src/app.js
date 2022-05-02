import express from "express";

import cookieParser from 'cookie-parser';
import http from 'http';

// import routes from './routes';
import passport from 'passport';
import cors from 'cors';

import userController from "./routes/userController.js";
import uploadFileController from "./routes/uploadFileController.js";
import Connect from "./models/db_models.js"
import dotenv from 'dotenv'

dotenv.config()

Connect.sync().then()
const app = express();
const port = process.env.PORT || 3070;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

// app.use('/', routes);
app.use('/users', userController);
app.use('/files', uploadFileController)

const server = http.Server(app)

server.listen(port, () => {
    console.log(`SERVER LISTENING ON PORT: ${port}`)
})

export default app;
