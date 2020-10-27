import jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import {getRepository} from "typeorm";
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';

import User from '../models/Users';

import authConfig from '../config/auth';

class SessionController {
    async store(req: Request, res: Response) {
        const usersRepository = getRepository(User);

        const schema = Yup.object().shape({
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'})
        }

        const {email, password} = req.body;

        const userFind = await usersRepository.findOne({
            where: {email},
        });


        if (!userFind) {
            return res.status(401)
                .json({error: 'User not found'});
        }

        if (!(await bcrypt.compare(password, userFind.password_hash))) {
            return res.status(401)
                .json({error: 'Password does not match'});
        }

        const {id, name} = userFind;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({id}, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            }),
        });
    }
}

export default new SessionController();
