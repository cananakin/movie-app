import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';

import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<MovieList />
				<MovieForm />
			</div>
		</ApolloProvider>
	);
}

export default App;
