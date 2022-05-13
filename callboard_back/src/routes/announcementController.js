import express from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {Op} from 'sequelize'

import passport from '../utils/passport.js';
import Connect from "../models/db_models.js"
import {mailer} from "../utils/emailSender.js";

dotenv.config();

const router = express.Router();

/* Announcement creation. */
router.post('/create', passport.authenticate("jwt"), async (req, res) => {
    try {
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()) {
            res.status(400).json({
                status: 'Error',
                data: validationErr.array()
            })
            return;
        }

        const categoryId = await Connect.models.Category.findOne({where: {title: req.body.category}})

        const announcementData = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            address: req.body.address,
            is_auction: req.body.is_auction,
            begin: req.body?.begin,
            end: req.body?.end,
            complated: req.body.complated,
            created_by: req.user.id,
            category: categoryId?.id
        }

        const announcement = await Connect.models.Announcement.create(announcementData)

        mailer(req.user.email, 'Your announcement is created! [Callboard App, NO REPLY!]', `Announcement with name ${announcementData.title} is created!`)

        res.status(201).json({
            status: 'Success',
            data: announcement
        })
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

/* Show Announcement with offset */
router.get('/show_all', async (req, res) => {
    try {
        const count = req.query.count;
        const padding = (req.query.padding || 0);

        if (!count) {
            const announcement = await Connect.models.Announcement.findAll({
                order: [
                    ['id', 'DESC'],
                ],
                offset: parseInt(padding),
                where: {
                    complated: false
                }
            });

            res.status(400).json({
                status: 'Error',
                data: announcement
            });

            return;
        }

        const allAnnouncement = await Connect.models.Announcement.findAll({
            order: [
                ['createdAt', 'DESC'],
            ],
            limit: parseInt(count),
            offset: parseInt(padding)
        })

        res.status(200).json({
            status: 'Success',
            data: allAnnouncement
        })
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

router.get('/search_by', async (req, res) => {
    try {
        const searchBy = req.query.search
        const category = req.query.category || ''
        const priceSort = req.query.price || ''
        const dateSort = req.query.date || ''

        let whereConds = new Object({
            where: {
                complated: false
            }
        })

        if (searchBy) {
            whereConds = {
                ...whereConds,
                where: {
                    ...whereConds.where,
                    title: {[Op.like]: `%${searchBy}%`}
                }
            }
        }

        if (category) {
            whereConds = {
                ...whereConds,
                include: [{
                    model: await Connect.models.Category,
                    as: 'Category',
                    where: {
                        id: category
                    }
                }]
            }
        }

        if (priceSort === 'l') {
            let order = whereConds.order === undefined ? [] : whereConds.order
            order = [...order, ['price', 'DESC']]
            whereConds = {
                ...whereConds,
                order: order,
            }
        }

        if (priceSort === 'h') {
            let order = whereConds.order === undefined ? [] : whereConds.order
            order = [...order, ['price', 'ASC']]
            whereConds = {
                ...whereConds,
                order: order,
            }
        }

        if (dateSort === 'l') {
            let order = whereConds.order === undefined ? [] : whereConds.order
            order = [...order, ['price', 'DESC']]
            whereConds = {
                ...whereConds,
                order: order,
            }
        }

        if (dateSort === 'h') {
            let order = whereConds.order === undefined ? [] : whereConds.order
            order = [...order, ['price', 'ASC']]
            whereConds = {
                ...whereConds,
                order: order,
            }
        }

        const searchedAnnouncement = await Connect.models.Announcement.findAll(whereConds)

        res.status(200).json({
            status: 'Success',
            data: searchedAnnouncement
        })
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

export default router;