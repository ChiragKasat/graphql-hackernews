import React from 'react';
import Link from './Link';
import { gql, useQuery } from '@apollo/client';

const FEED_QUERY = gql`
	{
		feed {
			links {
				url
				id
				description
				createdAt
			}
		}
	}
`;

const LinkList = () => {
	const { data, loading, error } = useQuery(FEED_QUERY);

	if (loading) return <p>loading</p>;
	if (error) return <p>error: {error}</p>;
	return (
		<div>
			{data.feed.links.map(link => (
				<Link key={link.id} link={link} />
			))}
		</div>
	);
};

export default LinkList;
