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
import { BrowserRouter } from 'react-router-dom';

const httpLink = createHttpLink({ uri: 'http://localhost:4000' });

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

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
