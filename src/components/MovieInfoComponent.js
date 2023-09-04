import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_KEY } from "../App";
import ratingicon from "../assets/rating-icon.svg";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MovieInfoComponent = (props) => {
  const [movieInfo, setMovieInfo] = useState();
  const { selectedMovie } = props;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
      if (selectedMovie) {
          setIsOpen(true); // open modal when a movie is selected
          Axios.get(
              `https://api.themoviedb.org/3/movie/${selectedMovie}?api_key=${API_KEY}`,
          ).then((response) => setMovieInfo(response.data));
      }
  }, [selectedMovie]);

  const handleClose = () => {
      setIsOpen(false);
  };

  return (
      <div className='InfoContainer'>
          {movieInfo ? (
              <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  closeAfterTransition
                  open={isOpen}
                  onClose={handleClose}
              >
                  <Box sx={{ ...style, maxHeight: '80vh', overflow: 'auto' }}>
                      <div className='boxcon'>
                         <img src={movieInfo.poster_path? `https://image.tmdb.org/t/p/w500${movieInfo.poster_path}` : 'https://archive.org/download/no-photo-available/no-photo-available.png' } className='PosterInfo' alt='MoviePhoto'/>
                         <div className='boxcolumn'>
                           <h5>Release Date</h5>
                           <span className='infocolumn'>{movieInfo.release_date}</span>
                           <h5>{movieInfo.production_countries.length === 1 ? 'Production Country' : 'Production Countries'}</h5>
                           {movieInfo.production_countries.length === 0 ? (<span className='infocolumn'>No information...</span>) : ( movieInfo.production_countries.map((country, index) => (
                              <span key={index} className="infocolumn">• {country.name}</span> )
                            ))}
                            
                          <div className="ratingcontainer">
                             <img src={ratingicon} className="ratingicon" />
                             <p className="ratingparag">
                                 <strong>{parseInt(movieInfo.vote_average)}.0 Vote Average</strong>
                             </p>
                         </div>

                         </div>
                      </div><br/>
                      <Typography id="transition-modal-title" variant="h6" component="h2">
                          {movieInfo.title}
                      </Typography>
                      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                          {movieInfo.overview? movieInfo.overview : "No description..." }
                      </Typography><br/>
                      <Button variant="contained" color="error" onClick={handleClose}>
                          CLOSE
                      </Button>
                  </Box>
              </Modal>
          ) : (
              "Loading..."
          )}
      </div>
  );
};



  export default MovieInfoComponent;