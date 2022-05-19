import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {Op} from 'sequelize'

dotenv.config();

const router = express.Router();

import passport from '../utils/passport.js';
import Connect from "../models/db_models.js"
import validator from "validator";

router.get('/user_chats', passport.authenticate("jwt"), async (req, res)=>{
    try{
        if (req.user === undefined) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found!'
            })
            return
        }

        const userId = req.user.id

        const chats = await Connect.models.Chat.findAll({
            where: {
                [Op.or]: [{
                    user2_id: userId
                },
                    {
                        user1_id: userId
                    }
                ]
            }
        })

        if (chats){
            res.status(200).json({
                status: 'Success',
                data: chats
            })
        }else{
            res.status(204).json({
                status: 'Not found!',
                data: 'Chats not found!'
            })
        }

    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

router.get('/chat_history/:id', passport.authenticate("jwt"), async (req, res)=>{
    try{
        if (!validator.isUUID(req.params.id)) {
            res.status(400).json({
                status: 'Error',
                data: 'Bad request'
            })
        }

        if (req.user === undefined) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found!'
            })
            return
        }

        const chatId = req.params.id

        const messages = await Connect.models.Message.findAll({
            where: {
                chat_id: chatId
            }
        })

        if (messages){
            res.status(200).json({
                status: 'Success',
                data: messages
            })
        }else{
            res.status(204).json({
                status: 'Not found!',
                data: 'Messages not found!'
            })
        }

    } catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

export default router;