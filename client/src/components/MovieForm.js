import React from 'react'


import { gql, useQuery } from '@apollo/client';

const getDirectorQraphql = gql`
    {
        directors {
            id,
            name
        }
    }
`;

const MovieForm = () => {
    const { loading, error, data } = useQuery(getDirectorQraphql);
    
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return (
        <div>
            <form action="">
                <div>
                    <input type="text" name="title" placeholder="Title" />
                </div>
                <div>
                    <textarea name="description" placeholder="Description" ></textarea>
                </div>
                <div>
                    <input type="text" name="year" placeholder="Year" />
                </div>
                <div>
                    <select name="director" id="director">
                        <option value="">Choose Director</option>
                        {
                            data.directors.map(({id, name}) => <option value={id}>{name}</option> )
                        }
                    </select>
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MovieForm;
