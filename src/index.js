import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import AuthPayload from './resolvers/AuthPayload';
import Subscription from './resolvers/Subscription';


const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/nikhil-arora-eecdb7/hackernews-clone/prod',
      secret: 'mysecret123',
      debug: true,
    }),
  }),
});

server.start(() => {
  // eslint-disable-next-line no-console
  console.log('Server is running on http://localhost:4000');
});
