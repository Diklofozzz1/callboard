import {body} from 'express-validator';

export const AnnouncementValidator = [
    body('title', 'Title is needed!').isString().withMessage('Title must be a string!'),
    body('price', 'Price is needed!').isString().withMessage('Price must be a string!'),
    body('description', 'Description is needed!').isString().withMessage('Description must be a string!'),
    body('address', 'Address is needed!').isString().withMessage('Address must be a string!'),
]