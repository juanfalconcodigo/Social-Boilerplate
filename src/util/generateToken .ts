import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../environment/environment';

const generateToken = (user: any) => {
    return jwt.sign({ user }, SECRET_KEY, { expiresIn: 604800 });
}

export{
    generateToken
}