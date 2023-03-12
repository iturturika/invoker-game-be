import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

import UserModel from '../models/User.js';
import { sendMail } from '../utils/aproveMail.js';

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            nickName: req.body.nickName,
            passwordHash: hash,
            isActive: false
        });

        const user = await doc.save();

        const token = jwt.sign({
            _id: user._id,
            nickName: user.nickName
        }, 'ozzy', { expiresIn: '30d' });

        sendMail(req.body.email, token);

        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Can't register`
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user) {
            return res.status(404).json({
                message: `User not found`
            });
        }
        if(user._doc.isActive === false) {
            return res.status(403).json({
                message: `Aprove your account`
            });
        }
        bcrypt.compare(req.body.password, user._doc.passwordHash, function(err, data) {
            if (err){
              // handle error
              console.log(err);
            }
            if (data) {
                const token = jwt.sign({
                    _id: user._id,
                    nickName: user.nickName
                }, 'ozzy', { expiresIn: '30d' });
                res.json({
                    token
                });
            } else {
              // response is OutgoingMessage object that server response http request
              return res.status(403).json({message: 'Incorect email or password'});
            }
          });
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: `Forbidden`
        })
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) {
            return res.status(404).json({
                message: `User not found`
            });
        }
        const {passwordHash, ...userData} = user._doc;
        res.json({userData});
    } catch (err) {
        console.log(err);
        res.status(403).json({
            message: `Forbidden`
        })
    }
}


export const aproveReg = async (req, res) => {
    try {
        const aproved = await UserModel.findOneAndUpdate({_id: req.body.id}, {isActive: true} );
        if(!aproved) {
            return res.status(404).json({
                message: `Can't aprove registration`
            });
        }
        res.json({
            message: `You aproved registration`
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: `Can't update isActive`
        })
    }
};


