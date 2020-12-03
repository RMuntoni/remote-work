// Import deps
import React from 'react'
import {IMovie} from './../IMovie';


// Import components
import { MovieListRow } from './list-row'

// Create interfaces
interface MovieListProps {
  movies: IMovie[];
  loading: boolean;
  toggleDetailClick: (id: number) => void;
}

// Create MovieList component
export const MovieList = (props: MovieListProps) => {
  // Show loading message
  if (props.loading) return <p>Neueste Filme werden abgerufen. Einen kleinen Moment bitte...</p>

  return (
    <table className="table">
        <thead>
          <tr>
            <th>Filmposter</th>
            <th>Title</th>            
            <th>Bewertung</th>
            <th>Favorit</th>
          </tr>
        </thead>

        <tbody>
          {props.movies.length > 0 ? (
            props.movies.map((movie: IMovie, idx) => (
              <MovieListRow
                key={movie.id}
                movie={movie} 
                toggleDetailClick={props.toggleDetailClick}
              />
              )
            )
          ) : (
            <tr>
              <td>Es wurden keine aktuellen Filme gefunden!</td>
            </tr>
          )}
        </tbody>
    </table>
  )
}