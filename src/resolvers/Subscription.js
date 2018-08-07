const newLinkSubscribe = (parent, args, context, info) => {
  const { db } = context;
  return db.subscription.link(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
};

const newLink = {
  subscribe: newLinkSubscribe,
};


const newVoteSubscribe = (parent, args, context, info) => {
  const { db } = context;
  return db.subscription.vote(
    { where: { mutation_in: ['CREATED'] } },
    info,
  );
};

const newVote = {
  subscribe: newVoteSubscribe,
};

export default {
  newLink,
  newVote,
};
