const postedBy = async (parent, args, context) => {
	return context.prisma.link
		.findUnique({ where: { id: parent.id } })
		.postedBy();
};

// id: parent => parent.id,
// 		description: parent => parent.description,
// 		url: parent => parent.url

module.exports = { postedBy };
