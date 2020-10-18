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
    }

};
