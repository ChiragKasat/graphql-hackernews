import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
	createHttpLink,
	ApolloClient,
	ApolloProvider,
	InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem(AUTH_TOKEN);
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
