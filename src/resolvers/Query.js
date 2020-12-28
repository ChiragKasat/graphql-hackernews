const feed = async (parent, args, context) => {
	const where = args.filter
		? {
				OR: [
					{ description: { contains: args.filter } },
					{ url: { contains: args.filter } }
				]
		  }
		: {};

	const links = await context.prisma.link.findMany({
		where,
		skip: args.skip,
		take: args.take,
		orderBy: args.orderBy
	});

	const count = await context.prisma.link.count({ where });

	return {
		links,
		count
	};
};

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
