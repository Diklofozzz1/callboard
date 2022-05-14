import express from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import passport from '../utils/passport.js';
import Connect from "../models/db_models.js"
import {generateMD5} from "../utils/generatorMD5.js";
import validator from "validator";
import {mailer} from '../utils/emailSender.js'

dotenv.config();

const router = express.Router();

/* Create User. */
router.post('/create', async (req, res) => {
    try {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()) {
            res.status(400).json({
                status: 'Error',
                data: validationErr.array()
            })
            return;
        }

        const isUniqueUser = await Connect.models.User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (isUniqueUser !== null) {
            res.status(409).json({
                status: 'Error',
                data: 'User with such email already exist!'
            })
            return;
        }

        const userData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: generateMD5(req.body.password),
            photo_url: req.body.photo_url,
            rating: req.body.rating
        }

        const user = await Connect.models.User.create(userData)

        mailer(userData.email, 'Email confirmation [Callboard App, NO REPLY!]', `Follow this link to confirm your email: <a href="http://localhost:${process.env.PORT || 3070}/users/verify/${user.id}"> FOLLOW ME! </a>`)

        res.status(201).json({
            status: 'Success',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
});


/* Login User. */
router.post('/login', passport.authenticate('local'), async (req, res) => {
        try {
            if (req.user === undefined) {
                res.status(404).json({
                    status: 'Error',
                    data: 'Cant find client data'
                })
                return
            }

            res.status(200).json({
                status: 'Success',
                data: {
                    user_data: req.user,
                    token: jwt.sign(
                        {data: req.user},
                        process.env.SECRET_KEY || 'SomeSecretKey',
                        {expiresIn: '30 days'})
                }
            })
        } catch (err) {
            res.status(500).json({
                status: 'Server Error',
                data: err
            });
        }
    }
)

/* Show logined User info from JWT payload. */
router.get("/me", passport.authenticate("jwt"), async (req, res) => {
    res.status(200).json({
        status: "Success",
        data: req.user
    })
})

/* Show User info by ID. */
router.get('/show/:id', async (req, res) => {
    try {
        if (!validator.isUUID(req.params.id)) {
            res.status(400).json({
                status: 'Error',
                data: 'Bad request'
            })
        }

        const user = await Connect.models.User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password', 'verified', 'phone_number']
            }
        });

        if (user) {
            return res.status(200).json({
                status: 'Success',
                data: user
            })
        } else {
            return res.status(404).json({
                status: 'Error',
                data: 'User not found'
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

/* Delete logined User info from JWT payload. */
router.delete('/delete', passport.authenticate("jwt"), async (req, res) => {
    try {
        const user = await Connect.models.User.findOne({
            where: {
                id: req.user.id
            }
        })

        await user.destroy()

        res.status(200).json({
            status: 'Success',
            data: 'User deleted!'
        })

    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

/* Update logined User info from JWT payload. */
router.patch('/update', passport.authenticate("jwt"), async (req, res) => {
    try {
        const user = await Connect.models.User.findOne({
            where: {
                id: req.user.id
            }
        })

        await user.update({
            ...user,
            ...req.body
        })

        res.status(200).json({
            status: 'Success',
            info: 'User data updated!',
            data: user
        })

    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

/* User email Verification  */
router.get('/verify/:id', async (req, res) => {
    try {
        const user = await Connect.models.User.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!user) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found'
            })
        } else {
            if (user.verified) {
                res.status(409).json({
                    status: 'Error',
                    data: 'User already verified!'
                })
            } else {
                await user.update({
                    verified: true
                })
            }
        }

    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

export default router;
