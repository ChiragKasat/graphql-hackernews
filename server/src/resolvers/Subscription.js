const newLinkSubscribe = (parent, args, context) => {
	return context.pubsub.asyncIterator('NEW_LINK');
};

const newVoteSubscribe = (parent, args, context) => {
	return context.pubsub.asyncIterator('NEW_VOTE');
};

const newLink = {
	subscribe: newLinkSubscribe,
	resolve: payload => {
		return payload;
	}
};

const newVote = {
	subscribe: newVoteSubscribe,
	resolve: payload => {
		return payload;
	}
};

module.exports = {
	newLink,
	newVote
};
