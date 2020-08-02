const graphql = require('graphql');
const _ = require('lodash');

// MongoDB Model
const Movie = require('../models/Movie');
const Director = require('../models/Director');

const { 
    GraphQLID, 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLInt, 
    GraphQLSchema,
    GraphQLList
} = graphql;



const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString},
        description: { type: GraphQLString},
        year: { type: GraphQLInt},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Movie.findById(parent.directorId)
            }
        }
    })
});
const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        birth: { type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({ directorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                // get data
                return Movie.findById(args.id)
            } 
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Director.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: MovieType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                year: { type: GraphQLInt },
                directorId: { type: GraphQLString }
            },
            resolve(parent, args) {
                const movie = new Movie({
                    title: args.title,
                    description: args.description,
                    year: args.year,
                    directorId: args.directorId
                })
                return movie.save();
            }
        },
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: GraphQLString },
                birth: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const director = new Director({
                    name: args.name,
                    birth: args.birth
                })
                return director.save();
            }
        }
    }
})

const movies = [
	{
		id: '1',
		title: 'The Godfather',
		description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        year: 1972, 
        directorId: '1'
	},
	{
		id: '2',
		title: 'Scarface',
		description: 'In Miami in 1980, a determined Cuban immigrant takes over a drug cartel and succumbs to greed.',
        year: 1980,
        directorId: '2'
	},
	{
		id: '3',
		title: 'Pulp Fiction',
		description: 'The lives of two mob hitmen, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
        year: 1994,
        directorId: '3'
	}
];

const directors = [
	{
		id: '1',
		name: 'Francis Ford Coppola',
		birth: 1939
	},
	{
		id: '2',
		name: 'Quentin Tarantino',
		birth: 1963
	},
	{
		id: '3',
		name: 'Brian De Palma',
		birth: 1940
	}
];

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})