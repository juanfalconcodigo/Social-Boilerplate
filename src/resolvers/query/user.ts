import { IResolvers } from "graphql-tools";
import User from "../../models/user.model";
import authenticated from '../../middlewares/authenticated';
import { AuthenticationError } from 'apollo-server-express';
const queryUser: IResolvers = {
    Query: {
        async getUsers(_: void, __: any, context) {
            const { user } = await authenticated({ context });
            if (!user) {
                throw new AuthenticationError("Unauthenticated!");
            }

            const users = await User.find({});
            return users;
        },
        async loadUser(_: void, __: any, context) {
            const { user, token } = await authenticated({ context });
            if (!user) {
                throw new AuthenticationError("Unauthenticated!");
            }

            return {
                ...user['user'],
                id: user['user']._id,
                token
            }

        }
    }
}
export default queryUser;