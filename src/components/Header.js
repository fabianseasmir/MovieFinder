import React from "react";
import movieicon from "../assets/movie-icon.svg";
import searchicon from "../assets/search-icon.svg";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function Header({ searchQuery = "", onTextChange, onGenreChange, selectedGenre = "" }) {
  return (
    <header className="header">
      <div className="appName">
        <img className="MovieImage" src={movieicon} alt="Movie Icon" />
        Movie Searcher
      </div>
      <div className="SearchBox">
        <img className="SearchIcon" src={searchicon} alt="Search Icon" />
        <input
          className="SearchInput"
          placeholder="Search Movie"
          value={searchQuery}
          onChange={onTextChange}
        />
      </div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-autowidth-label" style={{ color: "white" }}>
            Filter by genre:
          </InputLabel>
          <br />
          <Select
           labelId="demo-simple-select-autowidth-label"
           id="genres"
           name="genres"
           value={selectedGenre}
           onChange={onGenreChange}
           autoWidth
           style={{ color: "white" }}
          >
             <MenuItem value="O">
               All genres
             </MenuItem>
             <MenuItem value="28">Action</MenuItem>
             <MenuItem value="35">Comedy</MenuItem>
             <MenuItem value="18">Drama</MenuItem>
             <MenuItem value="27">Horror</MenuItem>
             <MenuItem value="10749">Romance</MenuItem>
             <MenuItem value="16">Animation</MenuItem>
             <MenuItem value="99">Documentary</MenuItem>
             <MenuItem value="53">Thriller</MenuItem>
             <MenuItem value="878">Science Fiction</MenuItem>
          </Select> 
        </FormControl>
      </div>
    </header>
  );
}

export default Header;
