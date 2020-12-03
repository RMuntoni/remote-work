// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {IMovie} from './../IMovie';


// Import components
import { MovieList } from './list'
import { MovieDetail } from './detail'

// Create Movie component
export const MovieDashboard = () => {
  // Prepare states
  const [filter, setFilter] = useState(''); //save the filter in state as to not lose it after returning from detailpage
  const [movies, setMovies] = useState([] as IMovie[]); //the movie list from the db
  const [loading, setLoading] = useState(true); //show a loading text while the movies are retreived
  const [showDetail, setShowDetail] = useState(false); //switch to render the detail or listview
  const [detailMovie, setDetailMovie] = useState(null as null | IMovie); //the current movie to show in detail view

  // Fetch all movies on initial render.
  useEffect(() => {
    fetchMovies();
  }, [])

  // Handler to toggle between list view and detail view
  const toggleDetailClick = (id: number) => {
    const detailMovies = movies.filter((movie: IMovie, index) => {
      return movie.id === id;
    })

    //if no movie matches the id we won't show it in detail
    if(!!detailMovies && detailMovies.length === 1){
      setDetailMovie(detailMovies[0]);
      setShowDetail(!showDetail);
    }
    else{
      console.log(`Detailmovie with id: ${id} not found`)
    }
  }

  // Fetch all movies
  const fetchMovies = async (filter?: string) => {
    // Send GET request to 'movies/get' endpoint if filter has a value append it as query
    if(!!filter)
      setFilter(filter);

    axios
      .get(`http://localhost:4001/movies/get${!!filter ? `?filter=${filter}` : ''}`)
      .then(response => {
        // Update the movies state
        setMovies(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the movie list: ${error}`))
  }

  return (
  <div className="container">
    <div className="row">
        <div className="col-sm-8"><h1>Movie Dashboard</h1></div>
        {!showDetail && <div className="col-sm-4 input-group"><input type="text" className="form-control" placeholder="Filmtitel..." value={filter} onChange={(e) => fetchMovies(e.currentTarget.value)}/></div>}
    </div>
    <div className="row">
      {!showDetail && <MovieList movies={movies} loading={loading} toggleDetailClick={toggleDetailClick} />}
      {showDetail && detailMovie && <MovieDetail movie={detailMovie} toggleDetailClick={toggleDetailClick} />}
    </div>
  </div>)
}