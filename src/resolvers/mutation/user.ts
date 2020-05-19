import { IResolvers } from 'graphql-tools';
import User from '../../models/user.model';
import { UserInputError } from 'apollo-server-express';
import { generateToken } from '../../util/generateToken ';
import bcrypt from 'bcryptjs';

const mutationUser: IResolvers = {
    Mutation: {
        async login(_, { email, password }) {
            const user = await User.findByEmail(email);

            if (!user) {
                throw new UserInputError("Wrong email* or password");
            }
            const match = await bcrypt.compare(password, user.password);

            if (!match || email !== user.email) {
                throw new UserInputError("Wrong email or password*");
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                id: user._id,
                token,
            };
        },
        async register(_, { registerInput: { firstName, lastName, email, birthday, gender, password } }) {
            const findUser = await User.findOne({ email });
            if (findUser) {
                throw new UserInputError("Email is taken", {
                    errors: {
                        email: "This email is taken",
                    }
                });
            }

            const newUser: any = new User({ firstName, lastName, email, birthday, gender, password });
            const savedUser = await newUser.add();
            const token = generateToken(newUser);
            return {
                ...savedUser._doc,
                id: savedUser._id,
                token
            }
        }
    }
}

export default mutationUser;