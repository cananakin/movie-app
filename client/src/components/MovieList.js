import React from 'react'

import { gql, useQuery } from '@apollo/client';

const getMovieQraphql = gql`
    {
        movies {
            id,
            title
        }
    }
`;

const MovieList = () => {

    const { loading, error, data } = useQuery(getMovieQraphql);
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <ul className="movie-list">
                { data.movies.map(({id, title}) => <li key={id}>{title}</li>)}
            </ul>
        </div>
    )
}

export default MovieList;