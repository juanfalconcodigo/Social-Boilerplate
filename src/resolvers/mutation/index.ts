import GMR from 'graphql-merge-resolvers';
import mutationUser from './user';
const mutationResolver=GMR.merge([
    mutationUser
]);

export default mutationResolver;