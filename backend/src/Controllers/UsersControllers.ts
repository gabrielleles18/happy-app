import {Request, Response} from "express";
import {getRepository} from "typeorm";
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';


import User from "../models/Users";
import UsersViews from "../views/users_views";

export default {
    async create(request: Request, response: Response) {
        const {name, email, password, user} = request.body;
        const usersRepository = getRepository(User);
        const data = {name, email, password, user};

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
            user: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const password_hash = await bcrypt.hash(data.password, 8);
        const dataUp = {name, email, user, password_hash};


        const userData = usersRepository.create(dataUp);
        await usersRepository.save(userData);

        return response.status(201).json(userData);
    },

    async update(req: Request, res: Response) {
        const usersRepository = getRepository(User);

        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string()
                .email(),
            oldPassword: Yup.string()
                .min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword: string, field: any) =>
                    oldPassword ? field.required() : field,
                ),
            confirmPassword: Yup.string().when('password', (password: string, field: any) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            )
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({error: 'Validation fails'})
        }

        const {email, oldPassword, password} = req.body;

        const user = await usersRepository.find(
            {where: {id: req.userId}}
        );


        if (email != user.email) {
            const userExists = await usersRepository.findOne({where: {email}});

            if (userExists) {
                return res.status(400).json({error: 'User already exists'});
            }
        }

        if (oldPassword && !(await bcrypt.compare(oldPassword, password))) {
            return res.status(401).json({error: 'Password does not match'});
        }
        const {id, name, provider, avatar_id} = await user.update(req.body);

        return res.json({id, name, email, provider, avatar_id})
    }
};
