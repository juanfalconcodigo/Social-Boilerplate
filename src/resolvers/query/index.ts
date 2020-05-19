import queryUser from "./user";
import GMR from 'graphql-merge-resolvers';

const queryResolver=GMR.merge([
    queryUser
]);
 export default queryResolver;