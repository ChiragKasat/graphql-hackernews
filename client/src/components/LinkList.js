import React from 'react';
import Link from './Link';
import { gql, useQuery } from '@apollo/client';

export const FEED_QUERY = gql`
	{
		feed {
			links {
				url
				id
				description
				createdAt
				postedBy {
					id
					name
				}
				votes {
					id
					user {
						id
					}
				}
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
			{data.feed.links.map((link, index) => (
				<Link key={link.id} link={link} index={index} />
			))}
		</div>
	);
};

export default LinkList;
