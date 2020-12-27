const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const resolvers = {
	Query: {
		info: () => 'This is the API of a Hackernews Clone',
		feed: async (parent, args, context) => await context.prisma.link.findMany(),
		link: async (_, args, context) => {
			return await context.prisma.link.findUnique({
				where: { id: parseInt(args.id) }
			});
		}
	},
	Mutation: {
		post: (_, args, context) => {
			const newLink = context.prisma.link.create({
				data: {
					url: args.url,
					description: args.description
				}
			});
			return newLink;
		},
		updateLink: async (_, args, context) => {
			const { description, url } = args;
			return await context.prisma.link.update({
				where: { id: parseInt(args.id) },
				data: { description, url }
			});
		},
		deleteLink: async (_, args, context) => {
			const id = parseInt(args.id);
			const link = await context.prisma.link.findUnique({
				where: { id }
			});
			await context.prisma.link.delete({ where: { id } });
			return link;
		}
	},
	Link: {
		id: parent => parent.id,
		description: parent => parent.description,
		url: parent => parent.url
	}
};

const prisma = new PrismaClient();

const server = new ApolloServer({
	typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
	resolvers,
	context: {
		prisma
	}
});

server.listen().then(({ url }) => console.log(`Server running on ${url}`));
