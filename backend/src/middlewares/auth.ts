import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from "express";
import authCofig from '../config/auth';
import {promisify} from 'util';

interface userId {
    userId: number
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({error: 'Token not provider'});
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisify(jwt.verify)(token, authCofig.secret);

        req.userId = decoded.id;

        return next();
    } catch (err) {
        return res.status(401).json({error: 'Token invalid'});
    }
}
