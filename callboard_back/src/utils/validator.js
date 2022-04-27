import { body } from 'express-validator';

export const RegisterValidate = [
    body('eMail', 'Need eMail!')
        .isEmail().withMessage('Incorrect E-Mail!')
        .isLength({
            min: 8,
            max: 40
        }).withMessage('Incorrect E-Mail length! Minimum length 8 char. Maximum length 40 char.'),

    body('firstName')
        .isString().withMessage('Incorrect firstName!')
        .isLength({
            min: 2,
            max: 20
        }).withMessage('Incorrect firstName length! Minimum length 2 char. Maximum length 20 char.'),

    body('lastName')
        .isString().withMessage('Incorrect lastName!')
        .isLength({
            min: 2,
            max: 20
        }).withMessage('Incorrect lastName length! Minimum length 2 char. Maximum length 20 char.'),

    body('phoneNumber').isString().withMessage('Is not phone number!'),
    body('password').isString().isLength({
        min: 8,
    }).withMessage('Incorrect password length! Minimum password name 8 char.'),
];