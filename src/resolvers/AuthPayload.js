const user = (root, args, context, info) => {
  const { db } = context;
  return db.query.user({ where: { id: root.user.id } }, info);
};

export default { user };
