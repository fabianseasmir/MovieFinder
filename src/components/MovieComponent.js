import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';



const MovieComponent = (props) => {
    const { title: Title, release_date: Year, id: imdbID, poster_path: Poster } = props.movie;
  
    return (
       <div className='MovieContainer' onClick={() =>{
        props.onMovieSelect(imdbID);
       }}>
          <Card sx={{ maxWidth: 305 }}>
              <CardMedia
                 sx={{ height: 305 }}
                 image={Poster? `https://image.tmdb.org/t/p/w500${Poster}`: 'https://archive.org/download/no-photo-available/no-photo-available.png'}
                />
              <CardContent>
                 <Typography gutterBottom variant="h6" component="div">
                     {Title}
                 </Typography>
                 <Typography variant="body2" color="text.secondary">
                      Released on: {Year} 
                 </Typography>
              </CardContent>
         </Card>
      </div> 
      
    );
  };
  export default MovieComponent;