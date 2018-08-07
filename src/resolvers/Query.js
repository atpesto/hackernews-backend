const feed = (parent, args, context, info) => {
  const { db } = context;

  const where = (
    args.filter
      ? {
        OR: [
          { url_contains: args.filter },
          { description_contains: args.filter },
        ],
      }
      : {}
  );

  return db.query.links({ where, skip: args.skip, first: args.first }, info);
};

export default { feed };
