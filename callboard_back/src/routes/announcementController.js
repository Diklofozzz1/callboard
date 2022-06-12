import express from 'express';
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import {Op} from 'sequelize'

import passport from '../utils/passport.js';
import Connect from "../models/db_models.js"
import {mailer} from "../utils/emailSender.js";
import validator from "validator";

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
            begin: new Date(req.body?.begin * 1000),
            end: new Date(req.body?.end * 1000),
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
                    complated: false,
                    is_auction: false
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
            offset: parseInt(padding),
            where: {
                complated: false,
                is_auction: false
            }
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

router.get('/announcement/:id', async (req, res)=>{
    try {
        if (!validator.isUUID(req.params.id)) {
            res.status(400).json({
                status: 'Error',
                data: 'Bad request'
            })
        }

        let announcement = await Connect.models.Announcement.findOne({
            where:{
                id: req.params.id
            }
        })

        const photos = await Connect.models.AnnouncementPhoto.findAll({
            where:{
                announcement_id: req.params.id
            }
        })

        if(announcement.length === 0){
            res.status(404).json({
                status: 'Error',
                data: `Announcement not found`
            })
            return
        }

        announcement.dataValues.photos = photos

        res.status(200).json({
            status: 'Success',
            data: announcement
        })

    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

//active aucts
router.get('/active_auct', async (req, res)=>{
    try {
        let allAuction = await Connect.models.Announcement.findAll({
            where:{
                complated: false,
                is_auction: true
            }
        })

        let act_auct =[]

        for(let item of allAuction){
            if(item.begin < Date.now() && item.end > Date.now()){
                item.dataValues.photos = await Connect.models.AnnouncementPhoto.findAll({
                    where: {
                        announcement_id: item.id
                    }
                })
                act_auct.push(item)
            }

        }

        res.status(200).json({
            status: 'Success',
            data: act_auct
        })

    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
})

//search router
router.get('/search_by', async (req, res) => {
    try {
        const searchBy = req.query.search
        const category = req.query.category || ''
        const priceSort = req.query.price || ''
        const dateSort = req.query.date || ''
        const typeSort = req.query.type || ''
        const userIdSort = req.query.user_id || ''

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

        if (typeSort) {
            whereConds = {
                ...whereConds,
                where: {
                    ...whereConds.where,
                    is_auction: typeSort
                }
            }
        }

        if (userIdSort) {
            whereConds = {
                ...whereConds,
                where: {
                    ...whereConds.where,
                    created_by: userIdSort
                }
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

        let searchedAnnouncement = await Connect.models.Announcement.findAll(whereConds)

        for(let item of searchedAnnouncement){
            item.dataValues.photos = await Connect.models.AnnouncementPhoto.findAll({
                where: {
                    announcement_id: item.id
                }
            })
        }

        console.log(searchedAnnouncement)

        if(searchedAnnouncement.length === 0){
            res.status(404).json({
                status: 'Error',
                data: `With such request nothing is found`
            })
            return
        }

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


/* Announcement editor */
router.patch('/edit_add/:id', passport.authenticate("jwt"), async (req, res)=>{
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
        const addsId = req.params.id

        const announcement = await Connect.models.Announcement.findOne({
            where: {
                id: addsId
            }
        })

        const creatorId = announcement.get('created_by');

        if (userId !== creatorId.toString()){
            return res.status(403).json({
                status: 'Error',
                data: 'You are not a creator of this announcement'
            })
        }

        await announcement.update({
            ...announcement,
            ...req.body
        })

        res.status(200).json({
            status: 'Success',
            info: 'Announcement data updated!',
            data: announcement
        })

    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})
export default router;