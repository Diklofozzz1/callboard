import express from 'express';
import jwt from 'jsonwebtoken';
import multer from 'multer';

import passport from '../utils/passport.js';
import cloudinary from "../utils/cloudinary.js";
import Connect from "../models/db_models.js";
import {generateMD5} from "../utils/generatorMD5.js";

const router = express.Router();

const store = multer.memoryStorage();
const upload = multer({
    dest: '../../uploads',
    storage: store
});

/* Upload User avatar. */
router.post('/avatar_loader', upload.single('avatar'), passport.authenticate("jwt"), async (req, res) => {
    try {
        if (req.user === undefined) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found!'
            })
            return
        }

        const file = req.file
        const userID = req.user.id

        cloudinary.uploader.upload_stream({
            public_id: `user_avatar_${userID}`,
            folder: `user_${userID}`
        }, async (err, result) => {
            if (err || !result) {
                return res.status(500).json({
                    status: 'Error',
                    data: err || 'Cant upload file!'
                })
            }

            const user = await Connect.models.User.findOne({
                where: {
                    id: userID
                }
            })

            if (user) {
                await user.update({
                    photo_url: result.url
                })
            }

            res.status(201).json({
                status: 'Success',
                data: {
                    title: 'File loaded to cloudinary!',
                    url: result.url
                }
            })
        }).end(file.buffer)
    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

router.post('/adds_photo_loader', upload.array('addsImages', 6), passport.authenticate("jwt"), async (req, res) => {
    try {
        if (req.user === undefined) {
            res.status(404).json({
                status: 'Error',
                data: 'User not found!'
            })
            return
        }

        const files = req.files
        const userId = req.user.id

        const adds = await Connect.models.Announcement.findOne({
            where: {
                created_by: userId
            }
        })

        const uploadPicture = (item, addsId) => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    public_id: `ad_${addsId}_${generateMD5(Math.random().toString())}`,
                    folder: `user_${userId}/${addsId}`
                }, (err, result) => {
                    if (res) {
                        resolve(result);
                    } else {
                        reject(err);
                    }
                }).end(item.buffer);
            });
        };

        let results = []

        if (adds) {
            const addsId = adds.id

            for (const item of files) {
                try {
                    const result = await uploadPicture(item, addsId)
                    if (result) {
                        const photoData = {
                            announcement_id: addsId,
                            photo_url: result.url
                        }
                        await Connect.models.AnnouncementPhoto.create(photoData)

                        results.push({
                            announcement_id: addsId.toString(),
                            photo_url: result.url
                        })
                    }
                } catch (e) {
                    console.log("Failed to load to cloudinary")
                }
            }
        }

        res.status(201).json({
            status: 'Success',
            data: {
                title: 'Files loaded to cloudinary!',
                url: results
            }
        })

    } catch (err) {
        res.status(500).json({
            status: 'Server Error',
            data: err
        });
    }
})

export default router;