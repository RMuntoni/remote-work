// Import database
const dataBaseService = require('./../services/databaseService')
const movieApiService = require('./../services/movieApiService');

//refresh the movie and genre data from the API. Is not exposed because the server should refresh the data on its own.
refreshFromApi = async() => {  
  const genrePromise = movieApiService.getGenres().then(dataBaseService.updateGenres);
  const moviePromise = movieApiService.getUpcomingMovies().then(dataBaseService.updateMovies);
  
  Promise.all([genrePromise, moviePromise])
    .then((result) => console.log('Success refresh'))
    .catch((error) => console.log(`Error on refresh: ${error}`));
}

//get all or filtered movies from our db
exports.getMovies = async(req, res) => {
  const filter = !!req && !!req.query && req.query.filter;
  const movies = await dataBaseService.getMovies(filter);

  for(let i = 0; i < movies.length; i++){
    const movie = movies[i];
    movie.imagePathBig = `${movieApiService.baseImagePath}w500${movie.imagePath}`;
    movie.imagePathSmall = `${movieApiService.baseImagePath}w92${movie.imagePath}`;
  }

  res.json(movies)
}

//set an interval on the server to refresh the data from the api
setInterval(() => {
  refreshFromApi()
  .then(() => console.log('Refreshed in server'))
  .catch((err) => console.log(err))}
  ,1000 * 60 * 10) //10min

//on startup call the function one time
refreshFromApi().then(() => console.log('Refreshed in server')).catch((err) => console.log(err));