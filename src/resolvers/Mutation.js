const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { getUserId } = require('../utils');

const signup = async (parent, args, context, info) => {
	const password = await bcrypt.hash(args.password, 10);

	const user = await context.prisma.user.create({
		data: { ...args, password }
	});

	const token = sign({ userId: user.id }, process.env.APP_SECRET);

	return {
		token,
		user
	};
};

const login = async (parent, args, context, info) => {
	const { email, password } = args;

	const user = await context.prisma.user.findUnique({
		where: { email: email }
	});
	if (!user) {
		throw new Error('No such user found');
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		throw new Error('Invalid password');
	}

	const token = sign({ userId: user.id }, process.env.APP_SECRET);

	return {
		token,
		user
	};
};

const post = async (parent, args, context) => {
	try {
		const { userId } = context;

		if (!userId) {
			throw new Error('Not Authorized');
		}

		const newLink = await context.prisma.link.create({
			data: {
				url: args.url,
				description: args.description,
				postedBy: { connect: { id: userId } }
			}
		});

		context.pubsub.publish('NEW_LINK', newLink);

		return newLink;
	} catch (err) {
		console.error(err);
	}
};

const vote = async (parent, args, context) => {
	try {
		const { userId } = context;

		if (!userId) {
			throw new Error('Not Authorized');
		}

		const vote = await context.prisma.vote.findUnique({
			where: { linkId_userId: { linkId: parseInt(args.linkId), userId } }
		});

		if (Boolean(vote)) {
			throw new Error(`Already voted for link: ${args.linkId}`);
		}

		const newVote = await context.prisma.vote.create({
			data: {
				link: { connect: { id: parseInt(args.linkId) } },
				user: { connect: { id: userId } }
			}
		});

		context.pubsub.publish('NEW_VOTE', newVote);

		return newVote;
	} catch (err) {
		console.error(err);
	}
};

// updateLink: async (_, args, context) => {
// 	const { description, url } = args;
// 	return await context.prisma.link.update({
// 		where: { id: parseInt(args.id) },
// 		data: { description, url }
// 	});
// },
// deleteLink: async (_, args, context) => {
// 	const id = parseInt(args.id);
// 	const link = await context.prisma.link.findUnique({
// 		where: { id }
// 	});
// 	await context.prisma.link.delete({ where: { id } });
// 	return link;
// }

module.exports = {
	signup,
	login,
	post,
	vote
};
