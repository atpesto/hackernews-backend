import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { APP_SECRET, getUserId } from '../utils';


const signup = async (parent, args, context) => {
  const password = await bcrypt.hash(args.password, 10);

  const { db } = context;

  const user = await db.mutation.createUser({
    data: {
      ...args,
      password,
    },
  }, '{ id }');

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context) => {
  const { db } = context;
  const user = await db.query.user({ where: { email: args.email } }, '{ id password }');
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const post = (parent, args, context, info) => {
  const userId = getUserId(context);

  const { db } = context;
  return db.mutation.createLink(
    {
      data: {
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } },
      },
    },
    info,
  );
};

const vote = async (parent, args, context, info) => {
  const { db } = context;
  const userId = getUserId(context);

  const linkExists = await db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId },
  });

  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
      },
    },
    info,
  );
};

export default {
  signup,
  login,
  post,
  vote,
};
