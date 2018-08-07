const links = (parent, args, context, info) => {
  const { db } = context;
  return db.query.links({ where: { id_in: parent.linkIds } }, info);
};

export default { links };
