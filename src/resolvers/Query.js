const feed = async (parent, args, context) =>
	await context.prisma.link.findMany();

const link = async (_, args, context) => {
	return await context.prisma.link.findUnique({
		where: { id: parseInt(args.id) }
	});
};

const info = () => 'This is the API of a Hackernews Clone';

module.exports = {
	feed,
	link,
	info
};
