const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const database = require('./helpers/database')
const app = express();

// dotenv
require('dotenv').config()

// Connect Database
database();

// we use the middleware for express graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(5000, () => {
    console.log('server is running...');
})