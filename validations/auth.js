import { body } from 'express-validator';

export const registerValidation = [
    body('email', "Incorrect email").isEmail(),
    body('password', "Incorrect password").isLength({ min: 5 }),
    body('nickName', 'nickName must be > 3 symbols').isLength({ min: 3 })
]