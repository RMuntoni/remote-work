// Import deps
import React, { useState } from 'react'
import {IMovie} from './../IMovie';

// Create interfaces
interface MovieRowProps {
  movie: IMovie;    
  toggleDetailClick: (id: number) => void
}

//reference images
const starOutline = './star-out.svg';
const starFull = './star-full.svg';

// Create MovieListRow component
export const MovieListRow = (props: MovieRowProps) => {
  const checkIsFavorite = (id: number): boolean => {
    return localStorage.getItem(id.toString()) === 'true'
  }

  //Save state of favorite movies
  const [isFavorite, setFavorite] = useState(checkIsFavorite(props.movie.id));

  //Handler to favorite a movie or unfavorite it
  const handleMovieFavorite = (id: number): void => {
    if(localStorage.getItem(id.toString()) === 'true')
      localStorage.setItem(id.toString(), 'false');
    else
      localStorage.setItem(id.toString(), 'true');      

    setFavorite(checkIsFavorite(id));
  }
  
  
  return (<tr>    
    <td><img src={props.movie.imagePathSmall} alt={`${props.movie.title} movie poster`} width="92" /></td>
    <td>
      <p><b>{props.movie.title}</b></p>
      <p><i>{props.movie.description.substring(0, 100)}...</i></p>
      <br/>
      <button type="button" className="btn btn-info" onClick={(e) => props.toggleDetailClick(props.movie.id)}>Mehr infos</button>
    </td>
    <td>{props.movie.rating}</td>
    <td><img className="favorite" src={isFavorite ? starFull : starOutline} width="30" onClick={(e) => handleMovieFavorite(props.movie.id)}/></td>
  </tr>)
}