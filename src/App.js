import './App.css';
import Header from "./components/Header";
import { useState } from "react";
import axios from 'axios';
import MovieInfoComponent from './components/MovieInfoComponent';
import MovieComponent from './components/MovieComponent';
import movieicon from "./assets/movie-icon.svg";

export const API_KEY = "b9acb4efd2d44cc3aea0cc3dc2eed0a2";

function App() {

  const [searchQuery, setSearchQuery] = useState('');
  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();
  const [timeoutId, updateTimeoutId] = useState();
  const [selectedGenre, setSelectedGenre] = useState('');


  const fetchData = async (searchQuery, selectedGenre) => {
    const query = searchQuery || '';
    const genre = selectedGenre === '0' ? '' : selectedGenre;
    let url = '';
    if (query && genre) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&with_genres=${genre}`;
    } else if (genre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${genre}`;
    } else {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    }
    const response = await axios.get(url);
    updateMovieList(response.data.results);
  };
  

  
  

  const handleTextChange = (event) => {
    onMovieSelect('')
    setSearchQuery(event.target.value)
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchData(event.target.value, selectedGenre), 500);
    updateTimeoutId(timeout);
  };
  
  
  const handleGenreChange = (event) => {
    const genre = event.target.value;
    setSelectedGenre(genre);
    fetchData(searchQuery, genre === null ? '' : genre);
  };
  
  
  return (
    <div className="container">
      <Header searchQuery={searchQuery} onTextChange={handleTextChange} onGenreChange={handleGenreChange} />
      {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} />}
      <div className="MovieListContainer">
        {movieList?.length ? (
          movieList.map((movie, index) => (
            <MovieComponent
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
            <img className='NotMovie' src={movieicon}/>
        )} 
      </div>
    </div>
  );
}

export default App;
