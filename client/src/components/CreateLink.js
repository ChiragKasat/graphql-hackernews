import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const CREATE_LINK_MUTATION = gql`
	mutation {
		post(url: $url, description: $description) {
			id
			createdAt
			description
			url
		}
	}
`;

const CreateLink = () => {
	const [formState, setFormState] = useState({ description: '', url: '' });

	const history = useHistory();

	const [createLink] = useMutation(CREATE_LINK_MUTATION, {
		variables: { description: formState.description, url: formState.url },
		onCompleted: () => history.push('/')
	});

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
					createLink();
				}}
			>
				<div className='flex flex-column mt3'>
					<input
						className='mb2'
						value={formState.description}
						onChange={e =>
							setFormState({
								...formState,
								description: e.target.value
							})
						}
						type='text'
						placeholder='A description for the link'
					/>
					<input
						className='mb2'
						value={formState.url}
						onChange={e =>
							setFormState({
								...formState,
								url: e.target.value
							})
						}
						type='text'
						placeholder='The URL for the link'
					/>
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};

export default CreateLink;
