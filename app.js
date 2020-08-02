const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

// we use the middleware for express graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(5000, () => {
    console.log('server is running...');
})