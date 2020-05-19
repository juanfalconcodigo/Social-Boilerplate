import {makeExecutableSchema} from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import {fileLoader,mergeTypes} from 'merge-graphql-schemas';
import resolvers from '../resolvers/resolvers.map';
import path from 'path';
const typeDefs = mergeTypes(fileLoader(path.join(`${__dirname}/**/*.graphql`)))

const schema:GraphQLSchema=makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;
