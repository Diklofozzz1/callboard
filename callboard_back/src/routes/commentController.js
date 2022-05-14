import express from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import passport from '../utils/passport.js';
import Connect from "../models/db_models.js"
import {mailer} from "../utils/emailSender.js";
import validator from "validator";

const router = express.Router();

dotenv.config();

/* Comment create */
router.post('/create/:id', passport.authenticate("jwt"), async (req, res) => {
    try {
        if (req.user === undefined) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found!'
            })
            return
        }

        if (req.params.id === req.user.id) {
            res.status(403).json({
                status: 'Error',
                data: 'You cant comment yourself!'
            })
            return
        }

        const commentData = {
            title: req.body.title,
            text: req.body.text,
            score: req.body.score,
            created_by: req.user.id,
            linked_to_user: req.params.id
        }

        if (commentData.score > 5 || commentData.score < 5) {
            res.status(400).json({
                status: 'Error',
                data: 'Score must be between 1 to 5!'
            })
            return
        }

        const comment = await Connect.models.Comments.create(commentData)

        mailer(req.user.email, 'Your comment is created! [Callboard App, NO REPLY!]', `Comment to ${commentData.linked_to_user} with title ${commentData.title} is created!`)

        res.status(201).json({
            status: 'Success',
            data: comment
        })
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

/* Show comment by user ID */
router.get('/show/:id', async (req, res) => {
    try {
        if (!validator.isUUID(req.params.id)) {
            res.status(400).json({
                status: 'Error',
                data: 'Bad request'
            })
        }

        const count = req.query.count;
        const padding = (req.query.padding || 0);

        const userId = req.params.id

        if (!count) {
            const comment = await Connect.models.Comments.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                offset: parseInt(padding),
                where: {
                    linked_to_user: userId
                }
            });

            res.status(400).json({
                status: 'Error',
                data: comment
            });

            return;
        }

        const allComments = await Connect.models.Comments.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            where: {
                linked_to_user: userId
            },
            limit: parseInt(count),
            offset: parseInt(padding)
        })

        if (allComments) {
            return res.status(200).json({
                status: 'Success',
                data: allComments
            })
        } else {
            return res.status(404).json({
                status: 'Error',
                data: 'Comments not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

/* Comment edite */
router.patch('/edit/:id', passport.authenticate("jwt"), async (req, res) => {
    try {
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

        const userId = req.user.id
        const commentId = req.params.id

        const comment = await Connect.models.Comments.findOne({
            where: {
                id: commentId
            }
        })

        const creatorId = comment.get('created_by');

        if (userId !== creatorId.toString()) {
            return res.status(403).json({
                status: 'Error',
                data: 'You are not a creator of this comment'
            })
        }

        await comment.update({
            ...comment,
            ...req.body
        })

        res.status(200).json({
            status: 'Success',
            info: 'Comment data updated!',
            data: comment
        })

    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

router.delete('/delete/:id', passport.authenticate("jwt"), async (req, res)=>{
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

        const userId = req.user.id
        const commentId = req.params.id

        const comment = await Connect.models.Comments.findOne({
            where: {
                id: commentId
            }
        })

        const creatorId = comment.get('created_by');

        if (userId !== creatorId.toString()) {
            return res.status(403).json({
                status: 'Error',
                data: 'You are not a creator of this comment'
            })
        }

        await comment.destroy()

        res.status(200).json({
            status: 'Success',
            data: 'User deleted!'
        })
    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

export default router;