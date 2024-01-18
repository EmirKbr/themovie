import React, { useState, useEffect } from 'react';
import { Input } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import "./App.css"
function App() {

  const [data, setData] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const imgUrl = "https://image.tmdb.org/t/p/w220_and_h330_face"

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae304e3f4d3830d95075ae6914b55ddf&query=${searchTitle}`)
      .then(data => data.json()).then(result => setData(result.results))
  },[searchTitle])

  return (
    <div className="App">
      <div className="searchArea">
      <SearchIcon color='info'/>
        <Input
          className="searchInput"
          id="standard-basic"
          placeholder="Search field"
          type="search"
          style={{ color: "white"}}
          sx={{ width: 1}}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      <div className="area">
        { (
            (searchTitle === "" || searchTitle.length < 2) ? data :
            data.filter((data) => data.original_title.toLowerCase().includes(searchTitle))
          ).map(data => (
          <Card sx={{ maxWidth: 345 }} key={data.id} className="card">
            <CardMedia className="CardMedia"
              component="img"
              image={imgUrl + data.poster_path}
            />
            <CardContent className="CardContent">
              <Typography variant="h5" component="div" className="title">
                {data.original_title}
              </Typography>
              {/* <Typography variant="p" component="div" >
                  {data.overview}
                </Typography> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default App;
