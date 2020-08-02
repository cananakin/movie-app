import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './App.css';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	cache: new InMemoryCache()
})

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="App">
				<h1>Hello</h1>
			</div>
		</ApolloProvider>
	);
}

export default App;
