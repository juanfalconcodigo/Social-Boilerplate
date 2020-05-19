import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../environment/environment';
import User from '../models/user.model';
import { generateToken } from '../util/generateToken ';


const authenticated = async ({ context, newToken, dontPopulate }: { context: any, newToken?: boolean, dontPopulate?: any }): Promise<{ user: any, token: any }> => {
    const authHeader = await context.req.headers.token;


    let user: any = null;
    let token = null;
    //obtengo el usuario del token
    if (authHeader) {
        token=authHeader;
        user = jwt.verify(authHeader, SECRET_KEY);
    }
    //genero un nuevo token para el usuario con populate
    if (newToken) {
        const newUser = await User.findById(user.id).populate(
            "friends",
            "firstName lastName avatarImage id username"
        );

        token = generateToken(newUser);
        user = newUser;
    }
    // genero un nuevo token para el usuario sin populate

    if (newToken && dontPopulate) {
        const newUser = await User.findById(user.id);
        token = generateToken(newUser);
        user = newUser;
    }


    return {
        user,
        token
    }

}

export default authenticated;