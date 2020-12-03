//Usage of https://www.npmjs.com/package/node-themoviedb for API wrapping. With this we don't need to implement it ourselves. 
const MovieDb = require('node-themoviedb');
const api_key = ""; // Please insert the api key here. For better security save on a secure database or similar and retrieve.

const mdb = new MovieDb(api_key, {language: 'de-DE'});

//get the configuration of the api and set base data for images on init
(async () => {
try {
    const config = await mdb.configuration.getAPIConfiguration();
    if(!!config && !!config.data){
        exports.baseImagePath = config.data.images.secure_base_url;
        return;
    }

    throw new Error('Config data was empty.')
}
catch(error){
    console.log('Error retrieving the movie DB API:')
    console.log(error);
}
})();

///export the image base path, so we can use it to build our src links
exports.baseImagePath = "";

///get the latest upcoming movies in germany
exports.getUpcomingMovies = async () => {
    try {
        const args = {
            pathParameters: {
                language: 'de-DE',
                region: 'de-DE'
            }
        }

        let movies = await mdb.movie.getUpcoming(args);        
        if(!!movies && !!movies.data && !!movies.data.results)
            return movies.data.results;
        else
            throw new Error('Movie Data was empty');
    }
    catch(error){
        console.log(error);
        return null;
    }
}

//get all genres of movies
exports.getGenres = async () =>  {
    try {
        const args = {
            pathParameters: {
                language: 'de-DE'
            }
        }

        const genres = await mdb.genre.getMovieList(args);
        
        if(!!genres && !!genres.data && !!genres.data.genres)
            return genres.data.genres;
        else
            throw new Error('Genre Data was empty');
    }
    catch(error){
        console.log(error);
        return null;
    }
}
