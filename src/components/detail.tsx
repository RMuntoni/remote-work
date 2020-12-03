// Import deps
import React, { useState } from 'react';
import {IMovie} from './../IMovie';

// Create interfaces
interface MovieDetailProps {
    movie: IMovie;    
    toggleDetailClick: (id: number) => void
  }

// Create MovieDetail component
export const MovieDetail = (props: MovieDetailProps) => {      
    return (
    <div className="jumbotron row">    
        <img className="col-sm-6" src={props.movie.imagePathBig} alt={`${props.movie.title} movie poster`} width="500" />
        <div className="col-sm-6">
            <p><b>{props.movie.title}</b></p>
            <p><i>Genres: {props.movie.genres} | Rating: {props.movie.rating} | Ab 18+? {props.movie.adult ? 'Ja' : 'Nein'} | </i></p>
            <p>{props.movie.description}</p>
            <button type="button" className="btn  btn-info" onClick={(e) => props.toggleDetailClick(props.movie.id)}>zurück zur Liste</button>
        </div>        
    </div>)
  }