const postedBy = async (parent, args, context) => {
	return context.prisma.link
		.findUnique({ where: { id: parent.id } })
		.postedBy();
};

const votes = async (parent, args, context) => {
	return context.prisma.link.findUnique({ where: { id: parent.id } }).votes();
};

// id: parent => parent.id,
// 		description: parent => parent.description,
// 		url: parent => parent.url

module.exports = {
	postedBy,
	votes
};
