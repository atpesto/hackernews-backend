import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';


const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: (root, args, context, info) => {
      const { db } = context;
      return db.query.links({}, info);
    },
  },

  Mutation: {
    post: (root, args, context, info) => {
      const { db } = context;
      return (
        db.mutation.createLink({
          data: {
            url: args.url,
            description: args.description,
          },
        }, info)
      );
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
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
