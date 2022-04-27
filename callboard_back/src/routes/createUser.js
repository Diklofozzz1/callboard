const express = require('express');
const {validationResult} = require("express-validator");
const {Connect} = require("../models/db_models");
const {generateMD5} = require("../utils/MD5generator");
const router = express.Router();



/* Create User. */
router.post('/', async (req, res) => {
    try{
        const validationErr = validationResult(req);

        if (!validationErr.isEmpty()){
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

        if(isUniqueUser !== null){
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

        res.status(201).json({
            status: 'Success',
            data: user
        })
    }catch (err){
        res.status(500).json({
            status: 'Server Error',
            data: err
        })
    }
});

module.exports = router;
