// Import database
//const { OPEN_READWRITE } = require('sqlite3');
const knex = require('./../db')

// Retrieve all movies or filtered movies
exports.getMovies = async (filter) => {
    //group props and select props for ease of change.
    let groupProps = ['movies.id', 'movies.title', 'movies.description', 'movies.rating', 'movies.adult', 'movies.imagePath']
    let selectProps = [...groupProps];
    selectProps.push(knex.raw('group_concat(genres.name) as genres'));

    // Get all or filtered movies from database
    if(!!filter)
        return knex.select(selectProps)
        .from('movies')
        .leftOuterJoin('movies_genres', 'movies.id', '=', 'movies_genres.movie_id')
        .leftOuterJoin('genres', 'movies_genres.genre_id', '=', 'genres.id')
        .where('title', 'like', `%${filter}%`)
        .groupBy(groupProps); // select all records from 'movies' table where title is like filter
    else
        return knex.select(selectProps)
        .from('movies')
        .leftOuterJoin('movies_genres', 'movies.id', '=', 'movies_genres.movie_id')
        .leftOuterJoin('genres', 'movies_genres.genre_id', '=', 'genres.id')
        .groupBy(groupProps);; // select all records from 'movies' table
}

//refresh the movies table with data from the API
exports.updateMovies = async(movies) => {
    if(!movies || movies.length === 0){
        throw new Error('API data was empty no update will be performed');
    }

    try {
        //remove all data from m:n table and movie table
        //the database is essentially a server side cache of 10mins so truncating and refilling is easier in this case
        await knex.select('*').from('movies_genres').truncate();
        await knex.select('*').from('movies').truncate();

        //insert the data from the api        
        await knex('movies').insert(convertToDatabaseModel(movies));
        await knex('movies_genres').insert(buildManyToMany(movies));
    }
    catch(err){
        throw err;
    }
}

//refresh the genres table with data from the API
exports.updateGenres = async(genres) => {    
    if(!genres || genres.length === 0){
        throw new Error('API data was empty no update will be performed');
    }

    try {
        //remove all data from genre table
        //the database is essentially a server side cache of 10mins so truncating and refilling is easier in this case
        await knex.select('*').from('genres').truncate();

        //insert the data from the api
        await knex('genres').insert(genres);

    } catch(err){
        throw err;
    }
}

//convert the data from the api to our database model
convertToDatabaseModel = (movies) => {
    let dbMovies = [];

    for(let i = 0; i < movies.length; i++){
        let movie = movies[i];
        dbMovies.push({
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            rating: movie.vote_average,
            adult: movie.adult,
            imagePath: movie.poster_path
        })  
    }
    return dbMovies;
}

//convert the data from the api of genres and movies to a many to many relationship data
buildManyToMany = (movies) => {
    let manyToMany = [];

    movies.forEach(movie => {        
        if(!!movie.genre_ids && movie.genre_ids.length > 0){
            movie.genre_ids.forEach(genreId => {
                manyToMany.push({movie_id: movie.id, genre_id: genreId});
            });
        }
    });

    return manyToMany;
}
