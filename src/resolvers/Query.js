const feed = (parent, args, context, info) => {
  const { db } = context;
  return db.query.links({}, info);
};

export default { feed };
